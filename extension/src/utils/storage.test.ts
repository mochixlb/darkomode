import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSettings, saveSettings } from "./storage";
import { DEFAULT_FILTERS } from "../constants";
import { browser } from "wxt/browser";

vi.mock("wxt/browser", () => {
  const storage = {
    sync: {
      get: vi.fn(),
      set: vi.fn(),
    },
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  };
  return { browser: { storage } };
});

describe("storage utils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (browser.storage.sync.get as any).mockReset?.();
    (browser.storage.sync.set as any).mockReset?.();
    (browser.storage.local.get as any).mockReset?.();
    (browser.storage.local.set as any).mockReset?.();
  });

  describe("getSettings", () => {
    it("returns defaults when storage is empty", async () => {
      (browser.storage.sync.get as any).mockResolvedValue({});

      const settings = await getSettings();
      expect(settings.themeMode).toBe("auto");
      expect(settings.filters).toEqual(DEFAULT_FILTERS);
    });

    it("returns stored values when present", async () => {
      (browser.storage.sync.get as any).mockResolvedValue({
        themeMode: "dark",
        filters: {
          brightness: 120,
          contrast: 90,
          saturation: 110,
          sepia: 5,
          grayscale: 10,
        },
      });

      const settings = await getSettings();
      expect(settings.themeMode).toBe("dark");
      expect(settings.filters).toEqual({
        brightness: 120,
        contrast: 90,
        saturation: 110,
        sepia: 5,
        grayscale: 10,
      });
    });

    it("rejects with ExtensionStorageError when storage.get rejects", async () => {
      (browser.storage.sync.get as any).mockRejectedValue(
        new Error("Some storage error")
      );

      await expect(getSettings()).rejects.toMatchObject({
        name: "ExtensionStorageError",
        message: expect.stringContaining("Failed to get settings"),
      });
    });

    it("falls back to local when sync.get rejects", async () => {
      (browser.storage.sync.get as any).mockRejectedValue(
        new Error("sync unavailable")
      );
      (browser.storage.local.get as any).mockResolvedValue({
        themeMode: "dark",
        filters: DEFAULT_FILTERS,
      });

      const settings = await getSettings();
      expect(settings.themeMode).toBe("dark");
      expect(browser.storage.local.get).toHaveBeenCalled();
    });
  });

  describe("saveSettings", () => {
    it("calls storage.sync.set and resolves on success", async () => {
      const input = { themeMode: "light" };
      (browser.storage.sync.set as any).mockResolvedValue(undefined);

      await expect(saveSettings(input)).resolves.toBeUndefined();
      expect(browser.storage.sync.set).toHaveBeenCalledWith(input);
    });

    it("rejects with ExtensionStorageError when storage.set rejects", async () => {
      (browser.storage.sync.set as any).mockRejectedValue(
        new Error("Set failed")
      );

      await expect(saveSettings({ themeMode: "dark" })).rejects.toMatchObject({
        name: "ExtensionStorageError",
        message: expect.stringContaining("Failed to save settings"),
      });
    });

    it("falls back to local when sync.set rejects", async () => {
      (browser.storage.sync.set as any).mockRejectedValue(
        new Error("sync unavailable")
      );
      (browser.storage.local.set as any).mockResolvedValue(undefined);

      await expect(saveSettings({ themeMode: "dark" })).resolves.toBeUndefined();
      expect(browser.storage.local.set).toHaveBeenCalledWith({
        themeMode: "dark",
      });
    });
  });
});
