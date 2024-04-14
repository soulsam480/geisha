/**
 * ! ==:== SYSTEM FILE
 * ESM loader for content script @see https://stackoverflow.com/a/53033388
 * ! ==:== SYSTEM FILE
 */

(async () => {
  const src = chrome.runtime.getURL('dist/contentScripts/main.mjs')

  await import(src)
})()
