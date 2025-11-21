import { DARKO_MODE_ID } from "@/constants";

/**
 * Inject a blocking style synchronously to prevent FOUC.
 * Must be called at document_start before the page renders.
 */
export function injectBlockingStyle(): void {
  const blockingStyle = document.createElement("style");
  blockingStyle.id = `${DARKO_MODE_ID}-blocking`;
  blockingStyle.textContent = `html:not([data-darko-ready]){visibility:hidden!important}`;

  const insertPoint = document.head || document.documentElement || document;
  if (insertPoint === document.head && document.head.firstChild) {
    document.head.insertBefore(blockingStyle, document.head.firstChild);
  } else if (
    insertPoint === document.documentElement &&
    document.documentElement.firstChild
  ) {
    document.documentElement.insertBefore(
      blockingStyle,
      document.documentElement.firstChild
    );
  } else {
    insertPoint.appendChild(blockingStyle);
  }
}

/**
 * Mark the document as ready and remove the blocking style on the next frame.
 */
export function markReadyAndRemoveBlockingStyle(): void {
  if (document.documentElement) {
    document.documentElement.setAttribute("data-darko-ready", "true");
  }
  const blockingStyle = document.getElementById(`${DARKO_MODE_ID}-blocking`);
  if (blockingStyle) {
    requestAnimationFrame(() => {
      blockingStyle.remove();
    });
  }
}
