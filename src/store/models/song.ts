import type { SongDetailed } from 'ytmusic-api'
import type { IArtist } from './artist'
import type { IThumbnail } from './thumbnail'

export interface ISong {
  id: string
  name: string
  artist: IArtist | null
  duration: number | null
  thumbnails: IThumbnail[]
}

export class Song implements ISong {
  __table_type = 'song' as const

  id: string
  name: string
  artist: IArtist | null
  duration: number | null
  thumbnails: IThumbnail[]

  constructor({ artist, duration, name, thumbnails, videoId }: SongDetailed) {
    this.id = videoId
    this.name = name
    this.duration = duration
    this.thumbnails = thumbnails

    this.artist = artist.artistId === null
      ? null
      : {
          id: artist.artistId,
          name: artist.name,
        }
  }
}
