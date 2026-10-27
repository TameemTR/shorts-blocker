// YouTube and Facebook are single-page apps: clicking a Short/Reel inside the
// site does NOT trigger a normal page load. rules.json catches typed/pasted
// URLs; this script catches everything that happens inside the page.

const BLOCKED_PAGE = chrome.runtime.getURL("blocked.html");

// Add new sites here: hostname test + path test + link selector to intercept
const SITES = [
  {
    host: /(^|\.)youtube\.com$/,
    path: /^\/shorts(\/|$)/,
    links: 'a[href^="/shorts"], a[href*="youtube.com/shorts"]',
  },
  {
    host: /(^|\.)facebook\.com$/,
    path: /^\/reels?(\/|$)/,
    links: 'a[href^="/reel"], a[href*="facebook.com/reel"]',
  },
];

const site = SITES.find((s) => s.host.test(location.hostname));
if (site) {
  const checkAndBlock = () => {
    if (site.path.test(location.pathname)) location.replace(BLOCKED_PAGE);
  };

  // 1. Stop clicks on matching links before the site's own router handles them
  document.addEventListener(
    "click",
    (e) => {
      const link = e.target.closest && e.target.closest(site.links);
      if (link) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true
  );

  // 2. Catch in-app navigation
  document.addEventListener("yt-navigate-start", checkAndBlock); // YouTube
  document.addEventListener("yt-navigate-finish", checkAndBlock); // YouTube
  window.addEventListener("popstate", checkAndBlock);

  // 3. Safety net (Facebook has no navigation events to hook into)
  setInterval(checkAndBlock, 400);

  checkAndBlock();
}
