import devCSS from 'virtual:uno.css?inline'
// import { logger } from '~/utils/logger'

// if (import.meta.hot) {
//   import.meta.hot.accept('uno.css', (mod) => {
//     logger.info('change ?')
//   })
// }

export function devStyleEl() {
  const styleEl = document.createElement('style')
  styleEl.innerHTML = devCSS

  return styleEl
}
