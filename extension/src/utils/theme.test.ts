// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { resolveThemeMode, isPageNativelyDark } from "./theme";

describe("resolveThemeMode", () => {
  it("returns null when mode is off", () => {
    expect(resolveThemeMode("off")).toBeNull();
  });

  it("returns explicit dark or light when provided", () => {
    expect(resolveThemeMode("dark")).toBe("dark");
    expect(resolveThemeMode("light")).toBe("light");
  });
});

describe("isPageNativelyDark", () => {
  function setComputedStyleBackgrounds(
    htmlBg?: string,
    bodyBg?: string,
    htmlColor?: string
  ) {
    const original = window.getComputedStyle;
    const mock = (el: Element) => {
      const isHtml = el === document.documentElement;
      const isBody = el === document.body;
      return {
        backgroundColor: isHtml
          ? htmlBg ?? "transparent"
          : isBody
          ? bodyBg ?? "transparent"
          : "transparent",
        color: isHtml ? htmlColor ?? "rgb(0, 0, 0)" : "rgb(0, 0, 0)",
      } as any;
    };
    // @ts-expect-error override
    window.getComputedStyle = mock;
    return () => {
      window.getComputedStyle = original;
    };
  }

  it("detects dark when backgrounds are clearly dark (low luminance)", () => {
    const restore = setComputedStyleBackgrounds(
      "rgb(20,20,20)",
      "rgb(30,30,30)"
    );
    document.body.innerHTML = ""; // ensure body exists
    expect(isPageNativelyDark()).toBe(true);
    restore();
  });

  it("detects light when backgrounds are clearly light", () => {
    const restore = setComputedStyleBackgrounds(
      "rgb(250,250,250)",
      "rgb(245,245,245)"
    );
    expect(isPageNativelyDark()).toBe(false);
    restore();
  });

  it("respects color-scheme meta tag (dark)", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "color-scheme");
    meta.setAttribute("content", "dark light");
    document.head.appendChild(meta);
    expect(isPageNativelyDark()).toBe(true);
    meta.remove();
  });

  it("respects color-scheme meta tag (light)", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "color-scheme");
    meta.setAttribute("content", "light");
    document.head.appendChild(meta);
    expect(isPageNativelyDark()).toBe(false);
    meta.remove();
  });

  it("falls back to text color when backgrounds are transparent", () => {
    const restore = setComputedStyleBackgrounds(
      "transparent",
      "transparent",
      "rgb(255,255,255)"
    );
    expect(isPageNativelyDark()).toBe(true);
    restore();
  });

  it("handles hex color backgrounds", () => {
    const restore = setComputedStyleBackgrounds("#111111", "#222");
    expect(isPageNativelyDark()).toBe(true);
    restore();
  });
});
