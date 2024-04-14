import type { AlbumFull } from 'ytmusic-api'
import type { IArtist } from './artist'
import { type ISong, Song } from './song'
import type { IThumbnail } from './thumbnail'

interface IAlbum {
  id: string
  name: string
  playlistId: string
  artist: IArtist | null
  year: number | null
  thumbnails: IThumbnail[]
  songs: ISong[]
}

export class Album implements IAlbum {
  __table_type = 'album' as const

  id: string
  name: string
  playlistId: string
  artist: IArtist | null
  year: number | null
  thumbnails: IThumbnail[]
  songs: ISong[]

  constructor({ albumId, artist, name, playlistId, songs, thumbnails, year }: AlbumFull) {
    this.id = albumId
    this.name = name
    this.playlistId = playlistId
    this.thumbnails = thumbnails
    this.year = year

    // FK
    this.artist = artist.artistId !== null ? { id: artist.artistId, name: artist.name } : null
    // FK
    this.songs = songs.map(it => new Song(it))
  }
}
