import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendMessageToTab, getActiveTab } from "./messaging";
import { browser } from "wxt/browser";

vi.mock("wxt/browser", () => {
  const tabs = {
    sendMessage: vi.fn(),
    query: vi.fn(),
  };
  const runtime = {
    onMessage: { addListener: vi.fn(), removeListener: vi.fn() },
  };
  return { browser: { tabs, runtime } };
});

describe("messaging utils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (browser.tabs.sendMessage as any).mockReset?.();
    (browser.tabs.query as any).mockReset?.();
  });

  describe("sendMessageToTab", () => {
    it("resolves with response on success", async () => {
      const tabId = 123;
      const payload = { type: "PING" };
      const response = { ok: true };
      (browser.tabs.sendMessage as any).mockResolvedValue(response);

      await expect(
        sendMessageToTab<typeof response>(tabId, payload)
      ).resolves.toEqual(response);
      expect(browser.tabs.sendMessage).toHaveBeenCalledWith(tabId, payload);
    });

    it("rejects when tabs.sendMessage rejects", async () => {
      const tabId = 1;
      (browser.tabs.sendMessage as any).mockRejectedValue(
        new Error("No such tab")
      );

      await expect(
        sendMessageToTab<any>(tabId, { type: "X" })
      ).rejects.toMatchObject({
        name: "ExtensionMessagingError",
        message: expect.stringContaining("Failed to send message"),
      });
    });

    it("rejects when response is undefined", async () => {
      (browser.tabs.sendMessage as any).mockResolvedValue(undefined);

      await expect(
        sendMessageToTab<any>(42, { type: "X" })
      ).rejects.toMatchObject({
        name: "ExtensionMessagingError",
        message: expect.stringContaining("No response from tab"),
      });
    });
  });

  describe("getActiveTab", () => {
    it("resolves with the first active tab", async () => {
      const tab = { id: 9, active: true };
      (browser.tabs.query as any).mockResolvedValue([tab]);

      await expect(getActiveTab()).resolves.toEqual(tab);
      expect(browser.tabs.query).toHaveBeenCalledWith({
        active: true,
        currentWindow: true,
      });
    });

    it("rejects when tabs.query rejects", async () => {
      (browser.tabs.query as any).mockRejectedValue(
        new Error("Permission denied")
      );

      await expect(getActiveTab()).rejects.toMatchObject({
        name: "ExtensionMessagingError",
        message: expect.stringContaining("Failed to query tabs"),
      });
    });

    it("rejects when no active tab is found", async () => {
      (browser.tabs.query as any).mockResolvedValue([]);

      await expect(getActiveTab()).rejects.toMatchObject({
        name: "ExtensionMessagingError",
        message: "No active tab found",
      });
    });
  });
});
