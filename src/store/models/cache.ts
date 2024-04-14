import type { AlbumFull } from 'ytmusic-api'
import { AlbumParser } from 'ytmusic-api'
import { GeishaEvent } from './channel'
import { Album } from './album'
import { logger } from '~/utils/logger'

type TBuildAble = AlbumFull
type TCacheAble = Album

interface IPlaylistPageParams {
  id: string
  type: 'playlist'
}

type TURLParseResult = IPlaylistPageParams | null

export class ModelCache {
  readonly albums = new Map<string, Album>()

  listen() {
    addEventListener('message', (e) => {
      const event = new GeishaEvent(e)

      if (!event.valid)
        return

      this.process(event)
    })
  }

  has(params: NonNullable<TURLParseResult>) {
    switch (params.type) {
      case 'playlist':
        return this.albums.has(params.id)

      default:
        return false
    }
  }

  parseURL(url: URL): TURLParseResult {
    if (url.pathname === '/playlist') {
      const id = url.searchParams.get('list')

      if (id === null)
        throw new Error('Invalid playlist')

      return {
        type: 'playlist',
        id,
      }
    }

    return null
  }

  private process(event: GeishaEvent) {
    const url = new URL(location.href)

    try {
      const pageParams = this.parseURL(url)

      if (pageParams === null)
        return null

      if (this.has(pageParams))
        return this.albums.get(pageParams.id) as Album

      const parsed = this.parse(pageParams, event.payload)
      const built = this.build(parsed)

      return this.cache(built)
    }
    catch (error) {
      logger.error('Error processing', error)
    }
  }

  private parse(params: TURLParseResult, data: any): AlbumFull {
    switch (params?.type) {
      case 'playlist':
        return AlbumParser.parse(data, params.id)

      default:
        throw new Error('Unable to parse')
    }
  }

  private build(payload: TBuildAble) {
    switch (payload.type) {
      case 'ALBUM':
        return new Album(payload)

      default:
        throw new Error('Unable to build')
    }
  }

  private cache(entry: TCacheAble) {
    switch (entry.__table_type) {
      case 'album':

        this.albums.set(entry.id, entry)

        return entry

      default:
        throw new Error('Unable to cache')
    }
  }
}
