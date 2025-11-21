import { DARKO_MODE_ID } from "@/constants";
import type { FilterSettings } from "@/types/index";

/**
 * Shadow DOM style manager for applying dark mode filters to shadow roots
 * Follows 2025 best practices for Shadow DOM styling in browser extensions
 */
export class ShadowDOMStyleManager {
  private shadowRoots: Set<ShadowRoot> = new Set();
  private mutationObserver: MutationObserver | null = null;
  private attachShadowInterceptor: (() => void) | null = null;
  private isActive = false;
  private hasInitialScan = false;

  // Batch scanning of added subtrees to avoid sync heavy work in observer callback
  private pendingScanElements: Set<Element> = new Set();
  private scanScheduled = false;

  /**
   * Recursively finds all shadow roots in the document
   * Uses a depth-first traversal to find nested shadow roots
   * Optimized for performance with early termination
   */
  private findAllShadowRoots(
    root: Document | ShadowRoot | Element
  ): ShadowRoot[] {
    const shadowRoots: ShadowRoot[] = [];
    const visited = new WeakSet<ShadowRoot>();

    const traverse = (container: Document | ShadowRoot | Element): void => {
      // Use querySelectorAll for efficient element selection
      const elements = container.querySelectorAll("*");

      for (const element of elements) {
        if (element instanceof Element) {
          const shadowRoot = element.shadowRoot;
          if (shadowRoot && !visited.has(shadowRoot)) {
            visited.add(shadowRoot);
            shadowRoots.push(shadowRoot);
            // Recursively find nested shadow roots
            traverse(shadowRoot);
          }
        }
      }
    };

    traverse(root);
    return shadowRoots;
  }

  /**
   * Injects theme styles into a shadow root
   * Creates a style element with the same ID pattern for consistency
   */
  private injectStylesIntoShadowRoot(
    shadowRoot: ShadowRoot,
    pageFilter: string,
    mediaFilter: string,
    isDark: boolean
  ): void {
    // Reuse existing style node when possible to prevent churn
    let style = shadowRoot.querySelector(
      `#${DARKO_MODE_ID}`
    ) as HTMLStyleElement | null;

    // Build CSS rules
    const cssRules: string[] = [];

    if (pageFilter) {
      // Apply filter to the shadow root's host element
      cssRules.push(`
        :host {
          filter: ${pageFilter} !important;
          ${isDark ? "background-color: #fff !important;" : ""}
        }
      `);
    }

    if (mediaFilter) {
      // Apply media filters within shadow root
      cssRules.push(`
        img,
        video,
        iframe,
        canvas,
        svg,
        picture,
        source,
        embed,
        object,
        [style*="background-image"] {
          filter: ${mediaFilter} !important;
          ${isDark ? "background-color: transparent !important;" : ""}
        }
      `);
    }

    if (cssRules.length === 0) {
      // If no rules, remove existing style if present
      if (style) {
        style.remove();
      }
      return;
    }

    if (!style) {
      style = shadowRoot.ownerDocument.createElement("style");
      style.id = DARKO_MODE_ID;
      // Append to shadow root's head or directly to shadow root
      const head = shadowRoot.querySelector("head");
      if (head) {
        head.appendChild(style);
      } else {
        // If no head, prepend to shadow root for early application
        shadowRoot.insertBefore(style, shadowRoot.firstChild);
      }
    }

    style.textContent = cssRules.join("\n");
  }

  /**
   * Removes theme styles from a shadow root
   */
  private removeStylesFromShadowRoot(shadowRoot: ShadowRoot): void {
    const style = shadowRoot.querySelector(`#${DARKO_MODE_ID}`);

    if (style) {
      style.remove();
    }
  }

  /**
   * Applies theme styles to all known shadow roots
   */
  private applyToAllShadowRoots(
    pageFilter: string,
    mediaFilter: string,
    isDark: boolean
  ): void {
    // Perform a full document scan only once for initial application
    if (!this.hasInitialScan) {
      const foundRoots = this.findAllShadowRoots(document);
      foundRoots.forEach((root) => this.shadowRoots.add(root));
      this.hasInitialScan = true;
    }

    // Apply styles to each shadow root
    this.shadowRoots.forEach((shadowRoot) => {
      try {
        // Skip if shadow root is no longer connected or accessible
        if (!shadowRoot || !shadowRoot.host) {
          return;
        }
        this.injectStylesIntoShadowRoot(
          shadowRoot,
          pageFilter,
          mediaFilter,
          isDark
        );
      } catch (error) {
        // Silently handle errors (some shadow roots may be inaccessible or closed)
        // Closed shadow roots can still be styled if we have a reference from attachShadow interception
        console.debug("[Darko Mode] Failed to style shadow root:", error);
      }
    });
  }

  /**
   * Sets up MutationObserver to watch for new shadow DOM elements
   * Uses efficient configuration to minimize performance impact
   */
  private setupMutationObserver(): void {
    if (this.mutationObserver) {
      return;
    }

    this.mutationObserver = new MutationObserver((mutations) => {
      // Debounce updates to avoid excessive style injections
      let hasNewShadowRoot = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode instanceof Element) {
              // Check if added node has shadow root
              if (addedNode.shadowRoot) {
                hasNewShadowRoot = true;
                this.shadowRoots.add(addedNode.shadowRoot);
              }
              // Defer scanning of descendants to next frame to reduce blocking
              this.pendingScanElements.add(addedNode);
            }
          }
        }
      }

      // Trigger style update if new shadow roots found
      if (hasNewShadowRoot) {
        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
          this.updateStyles();
        });
      }

      // Schedule batched scan of added subtrees
      this.scheduleScanOfPendingElements();
    });

    // Observe document with optimized options
    this.mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * Schedules scanning of pending added elements for shadow roots
   */
  private scheduleScanOfPendingElements(): void {
    if (this.scanScheduled || this.pendingScanElements.size === 0) {
      return;
    }
    this.scanScheduled = true;
    requestAnimationFrame(() => {
      this.scanScheduled = false;
      if (this.pendingScanElements.size === 0) {
        return;
      }
      const elements = Array.from(this.pendingScanElements);
      this.pendingScanElements.clear();

      let foundAny = false;
      for (const el of elements) {
        try {
          const descendantRoots = this.findAllShadowRoots(el);
          if (descendantRoots.length > 0) {
            foundAny = true;
            descendantRoots.forEach((root) => this.shadowRoots.add(root));
          }
        } catch (error) {
          console.debug("[Darko Mode] Failed scanning added subtree:", error);
        }
      }

      if (foundAny) {
        this.updateStyles();
      }
    });
  }

  /**
   * Intercepts Element.attachShadow to catch closed shadow roots
   * This is necessary because closed shadow roots are not accessible via shadowRoot property
   */
  private interceptAttachShadow(): void {
    if (this.attachShadowInterceptor) {
      return;
    }

    const originalAttachShadow = Element.prototype.attachShadow;
    const self = this;

    Element.prototype.attachShadow = function (
      this: Element,
      init: ShadowRootInit
    ): ShadowRoot {
      const shadowRoot = originalAttachShadow.call(this, init);

      // Add to our collection
      self.shadowRoots.add(shadowRoot);

      // Apply styles immediately if active
      if (self.isActive && self.currentFilters) {
        requestAnimationFrame(() => {
          try {
            self.injectStylesIntoShadowRoot(
              shadowRoot,
              self.currentFilters!.pageFilter,
              self.currentFilters!.mediaFilter,
              self.currentFilters!.isDark
            );
          } catch (error) {
            console.debug(
              "[Darko Mode] Failed to style intercepted shadow root:",
              error
            );
          }
        });
      }

      return shadowRoot;
    };

    this.attachShadowInterceptor = () => {
      Element.prototype.attachShadow = originalAttachShadow;
    };
  }

  /**
   * Current filter state for reapplication
   */
  private currentFilters: {
    pageFilter: string;
    mediaFilter: string;
    isDark: boolean;
  } | null = null;

  /**
   * Applies theme styles to document and all shadow roots
   */
  applyStyles(pageFilter: string, mediaFilter: string, isDark: boolean): void {
    this.isActive = true;
    this.currentFilters = { pageFilter, mediaFilter, isDark };

    // Apply to main document (handled by existing code)
    // Apply to all shadow roots
    this.applyToAllShadowRoots(pageFilter, mediaFilter, isDark);

    // Ensure observers are set up
    this.setupMutationObserver();
    this.interceptAttachShadow();
  }

  /**
   * Updates styles on all shadow roots with current filter state
   */
  updateStyles(): void {
    if (!this.currentFilters) {
      return;
    }

    this.applyToAllShadowRoots(
      this.currentFilters.pageFilter,
      this.currentFilters.mediaFilter,
      this.currentFilters.isDark
    );
  }

  /**
   * Removes all theme styles from shadow roots
   */
  removeStyles(): void {
    this.isActive = false;
    this.currentFilters = null;

    // Ensure observers and interceptors are fully disabled when styles are removed
    this.disableObserversAndInterceptors();

    this.shadowRoots.forEach((shadowRoot) => {
      try {
        this.removeStylesFromShadowRoot(shadowRoot);
      } catch (error) {
        console.debug(
          "[Darko Mode] Failed to remove styles from shadow root:",
          error
        );
      }
    });

    this.shadowRoots.clear();
    this.hasInitialScan = false;
    this.pendingScanElements.clear();
    this.scanScheduled = false;
  }

  /**
   * Cleans up observers and interceptors
   */
  cleanup(): void {
    this.removeStyles();

    // removeStyles already disables observers and interceptors
  }

  /**
   * Disables MutationObserver and restores Element.prototype.attachShadow
   * Called when turning the theme off and during full cleanup
   */
  private disableObserversAndInterceptors(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    if (this.attachShadowInterceptor) {
      this.attachShadowInterceptor();
      this.attachShadowInterceptor = null;
    }
  }
}

/**
 * Singleton instance for global use
 */
export const shadowDOMStyleManager = new ShadowDOMStyleManager();
