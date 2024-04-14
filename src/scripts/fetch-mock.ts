import { MonkeyFetch } from '@timwheeler/monkey-fetch'
import { logger } from '~/utils/logger'

const YTM_RE = /music\.youtube\.com\/youtubei/

let monkeyFetch: MonkeyFetch

const requestMap = new Map<string, any>()

async function createPayload(response: Response & { request: Request }) {
  const id = response.request.headers.get('X-GEISHA-ID')

  logger.info('matched request id', id)

  let body = null

  if (id !== null) {
    body = requestMap.get(id)
    requestMap.delete(id)
  }

  return {
    url: response.request.url,
    requestBody: body,
    body: await response.json(),
  }
}

async function init() {
  logger.info('fetch patch init')

  window.postMessage({
    type: 'G:FETCH_PATCH_INIT',
  })

  if (window.location.host !== 'music.youtube.com')
    return

  monkeyFetch = new MonkeyFetch()

  monkeyFetch.configure({
    async request(resource, options = {}) {
      try {
        const id = window.crypto.randomUUID()

        if (resource instanceof Request) {
          const cloned = resource.clone()

          requestMap.set(id, await cloned.json())

          logger.info('marked request', id, resource.url)

          resource.headers.append('X-GEISHA-ID', id)
        }

        return Promise.resolve([resource, options])
      }
      catch (error) {
        logger.error(error)
        return Promise.resolve([resource, options])
      }
    },
    async response(response) {
      try {
        if (!YTM_RE.test(response.url))
          return Promise.resolve(response)

        logger.info('captured: ', response.request.url)

        const cloned = response.clone()

        logger.info('cloned. sending response to store...')

        void createPayload(Object.assign(cloned, { request: response.request })).then((payload) => {
          postMessage({
            type: 'G:RESPONSE_CAPTURED',
            data: payload,
          })

          logger.info('sent via: G:RESPONSE_CAPTURED')
        })

        return Promise.resolve(response)
      }
      catch (error) {
        logger.error(error)

        return Promise.resolve(response)
      }
    },
  })
}

init()
