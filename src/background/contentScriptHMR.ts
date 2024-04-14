import { tabs, webNavigation } from 'webextension-polyfill'
import { isForbiddenUrl } from '~/env'
import { logger } from '~/utils/logger'

// Firefox fetch files from cache instead of reloading changes from disk,
// hmr will not work as Chromium based browser
webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
  // Filter out non main window events.
  if (frameId !== 0)
    return

  if (isForbiddenUrl(url))
    return

  logger.info('AAA', tabId, frameId, url)

  // inject the latest scripts
  tabs.executeScript(tabId, {
    file: `./dist/contentScripts/index.mjs`,
    runAt: 'document_end',
  }).catch(error => console.error(error))
})
