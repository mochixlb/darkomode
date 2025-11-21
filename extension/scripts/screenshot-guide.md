#!/usr/bin/env node

/**
 * Simple guide script for taking extension popup screenshots
 * 
 * Steps:
 * 1. Build the extension: npm run build
 * 2. Load it in Chrome (chrome://extensions/)
 * 3. Click the extension icon
 * 4. Take a screenshot using your preferred method
 */

console.log(`
📸 Extension Popup Screenshot Guide
===================================

Method 1: Manual Screenshot (Recommended)
------------------------------------------
1. Build: cd extension && npm run build
2. Load in Chrome:
   - Open chrome://extensions/
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select: extension/dist/chrome-mv3
3. Screenshot:
   - Click extension icon in toolbar
   - Use Cmd+Shift+4 (Mac) or Snipping Tool (Windows)
   - Or use Chrome DevTools screenshot

Method 2: Chrome DevTools Screenshot
-------------------------------------
1. Load extension (see Method 1)
2. Right-click extension icon → Inspect popup
3. In DevTools, click device toolbar icon
4. Set dimensions (e.g., 400x600 for popup)
5. Use DevTools screenshot feature

Method 3: Browser Extension Screenshot Tool
--------------------------------------------
Install "Full Page Screen Capture" extension:
- https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl
- Click extension icon → Capture popup

Tips:
- Popup dimensions are typically ~400px wide
- Make sure popup is fully loaded before screenshot
- Consider taking screenshots of both tabs (Theme & Customize)
`);


