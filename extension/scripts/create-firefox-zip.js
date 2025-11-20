import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, "../dist/firefox-mv3");
const zipPath = join(__dirname, "../dist/darko-mode-1.0.0-firefox.zip");

try {
  // Use zip command to create the archive
  execSync(`cd "${distDir}" && zip -r "${zipPath}" . -x "*.DS_Store"`, {
    stdio: "inherit",
  });
  console.log("✓ Created Firefox ZIP file");
} catch (error) {
  console.error("✗ Error creating ZIP:", error.message);
  process.exit(1);
}
