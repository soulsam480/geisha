// import { runtime } from 'webextension-polyfill'
import { logger } from '~/utils/logger'

// only on dev mode
if (import.meta.hot) {
  logger.info('RUN')

  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

// runtime.onInstalled.addListener((): void => {
//   // eslint-disable-next-line no-console
//   console.log('Extension installed')
// })
