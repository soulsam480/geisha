/* eslint-disable no-console */

export const logger = {
  log(...args: any[]) {
    console.log('[Geisha Log]: ', ...args)
  },
  info(...args: any[]) {
    console.info('[Geisha Info]: ', ...args)
  },
  error(...args: any[]) {
    console.error('[Geisha Error]: ', ...args)
  },
}
