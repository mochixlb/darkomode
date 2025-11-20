import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = join(__dirname, "../dist/firefox-mv3/manifest.json");

try {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

  // Add Firefox-specific settings
  // data_collection_permissions is required for all new Firefox extensions
  // The 'required' array must have at least 1 item
  // Since we don't collect any data, we declare an empty set of permissions
  // Using an empty object structure that indicates no data collection
  manifest.browser_specific_settings = {
    gecko: {
      id: "darko-mode@darkomode.com",
      data_collection_permissions: {
        required: ["none"], // Declare that no data collection permissions are required
      },
    },
  };

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log("✓ Added browser_specific_settings to Firefox manifest");
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("⚠ Firefox manifest not found, skipping...");
  } else {
    console.error("✗ Error fixing Firefox manifest:", error.message);
    process.exit(1);
  }
}
