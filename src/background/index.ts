import { runtime } from 'webextension-polyfill'
import { logger } from '~/utils/logger'

runtime.onInstalled.addListener(() => {
  logger.info('Installed')
})
