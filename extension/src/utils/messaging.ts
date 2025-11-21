import type { ExtensionMessage } from "@/types/index";
import { browser } from "wxt/browser";

/**
 * Cross-browser messaging error class
 */
class ExtensionMessagingError extends Error {
  constructor(message: string, public readonly originalError?: string) {
    super(message);
    this.name = "ExtensionMessagingError";
  }
}

/**
 * Sends a message to a specific tab with proper error handling
 */
export async function sendMessageToTab<TResponse>(
  tabId: number,
  message: ExtensionMessage | { type: string; [key: string]: unknown }
): Promise<TResponse> {
  try {
    const response = (await browser.tabs.sendMessage(
      tabId,
      message
    )) as TResponse | undefined;

    if (response === undefined) {
      // Content scripts might not respond if they don't handle the message type
      // or if an error occurred.
      throw new ExtensionMessagingError(`No response from tab ${tabId}`);
    }

    return response;
  } catch (err: unknown) {
    const originalMessage =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    throw new ExtensionMessagingError(
      `Failed to send message to tab ${tabId}: ${originalMessage}`,
      originalMessage
    );
  }
}

/**
 * Gets the active tab in the current window
 */
export async function getActiveTab(): Promise<chrome.tabs.Tab> {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0] as unknown as chrome.tabs.Tab | undefined;
    if (!tab) {
      throw new ExtensionMessagingError("No active tab found");
    }
    return tab;
  } catch (err: unknown) {
    const originalMessage =
      err instanceof Error ? err.message : String(err ?? "Unknown error");
    throw new ExtensionMessagingError(
      `Failed to query tabs: ${originalMessage}`,
      originalMessage
    );
  }
}
