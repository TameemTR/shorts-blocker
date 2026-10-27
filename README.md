# Short Video Blocker

A Chrome / Brave extension (Manifest V3) that blocks **YouTube Shorts** and **Facebook Reels**.

## What it blocks

- Typed or pasted URLs such as `https://www.youtube.com/shorts` and `https://www.facebook.com/reel`
- Clicks on Shorts / Reels links inside YouTube and Facebook
- Shorts shelves, sidebar entries and Shorts cards on YouTube
- Reels links and menu entries on Facebook

Blocked pages are redirected to a local "Short videos are blocked" page.

## Installation

1. Download and unzip the project folder.
2. Open `chrome://extensions` (Chrome) or `brave://extensions` (Brave).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the `shorts-blocker` folder.
5. Visit `https://www.youtube.com/shorts` to confirm it redirects to the blocked page.

## Updating

1. Unzip the new file over your old `shorts-blocker` folder.
2. Go to `chrome://extensions` (or `brave://extensions`) and click the reload icon on the extension.
3. Refresh any open Facebook or YouTube tabs.

## How it works

YouTube and Facebook are single-page apps, so one mechanism is not enough. The extension uses three layers:

| Layer | File | Purpose |
|-------|------|---------|
| Network rules | `rules.json` | Redirects full page loads of blocked URLs (declarativeNetRequest) |
| Content script | `content.js` | Cancels clicks on Shorts/Reels links and redirects in-app navigation |
| Stylesheet | `hide.css` | Hides Shorts/Reels shelves, menu entries and cards |

## Project structure

```
shorts-blocker/
├── manifest.json   # Extension config: permissions, rules, content scripts
├── rules.json      # Static URL blocking rules
├── content.js      # In-page link blocking and navigation checks
├── hide.css        # Hides Shorts/Reels elements
├── blocked.html    # Page shown when something is blocked
└── README.md
```

## Adding another site

1. Add the site to `host_permissions`, `content_scripts.matches` and `web_accessible_resources.matches` in `manifest.json`.
2. Add a redirect rule to `rules.json` with a new unique `id`.
3. Add an entry to the `SITES` list in `content.js` (hostname pattern, path pattern, link selector).
4. Reload the extension.

## Known limitations

- Facebook uses scrambled class names, so Reels cards inside the main feed may still be visible. Clicking them is still blocked.
- YouTube and Facebook change their page markup from time to time, so the selectors in `hide.css` may need updating. The URL blocking is much more stable.
- Browser extensions do not work inside the YouTube or Facebook mobile apps, and Chrome/Brave on Android do not support extensions.
- The extension can be disabled from the extensions page, so it relies on your own commitment.
