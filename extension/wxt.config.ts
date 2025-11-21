import { defineConfig } from "wxt";
import path from "path";

// https://wxt.dev/api/config.html
export default defineConfig({
  outDir: "dist",
  entrypointsDir: "src/entrypoints",
  manifestVersion: 3, // Force MV3 for all browsers including Firefox
  webExt: {
    disabled: true, // Disable auto-launch of browser
  },
  vite: () => ({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
        "@/types": path.resolve(__dirname, "./src/types"),
        "@/constants": path.resolve(__dirname, "./src/constants.ts"),
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress "use client" directive warnings from Radix UI modules
          // These are harmless in a Chrome extension context
          if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" &&
            warning.message?.includes('"use client"')
          ) {
            return;
          }
          // Use default warning handler for other warnings
          warn(warning);
        },
      },
    },
  }),
  manifest: (env) => {
    const baseManifest: any = {
      name: "darko mode",
      description: "Toggle dark mode and light mode on any website",
      version: "1.0.0",
      author: "Darko Mode",
      homepage_url: "https://darkomode.com",
      permissions: ["storage", "activeTab", "tabs"],
      host_permissions: ["<all_urls>"],
      icons: {
        "16": "/icons/icon-16.png",
        "32": "/icons/icon-32.png",
        "48": "/icons/icon-48.png",
        "128": "/icons/icon-128.png",
      },
      action: {
        default_popup: "popup.html",
        default_icon: {
          "16": "/icons/icon-16.png",
          "32": "/icons/icon-32.png",
          "48": "/icons/icon-48.png",
          "128": "/icons/icon-128.png",
        },
        default_title: "darko mode",
      },
    };

    // Firefox-specific: Required data collection declaration (as of Nov 3, 2025)
    // Set to "none" since we don't collect any personal or behavioral data
    // gecko.id is required for AMO submission (format: addon-name@yourdomain.com)
    // Check multiple ways WXT might indicate Firefox build
    const isFirefox = 
      env.FIREFOX === true || 
      env.BROWSER === "firefox" ||
      (typeof process !== "undefined" && process.env.BROWSER === "firefox");
    
    if (isFirefox) {
      baseManifest.browser_specific_settings = {
        gecko: {
          id: "darko-mode@darkomode.com",
          data_collection_permissions: "none",
        },
      };
    }

    return baseManifest;
  },
});


