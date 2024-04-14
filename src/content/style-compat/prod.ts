import 'uno.css'
import { runtime } from 'webextension-polyfill'

export function prodStyleEl() {
  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', runtime.getURL('assets/style.css'))

  return styleEl
}
