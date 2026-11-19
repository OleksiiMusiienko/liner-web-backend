
import type { Cover } from "./cover.js";
import type { Track, ApiTrack } from "./track.js";
//определяет фильтр поиска
export type SearchType =
  | "all"
  | "track"
  | "artist"
  | "album"
  | "playlist";

export const SEARCH_TYPES: readonly SearchType[] = [
  "all",
  "track",
  "artist",
  "album",
  "playlist",
];

export interface SearchArtistItem {
  type: "artist";
  id: string;
  name: string;
  cover?: Cover;
}

export interface SearchAlbumItem {
  type: "album";
  id: string;
  title: string;
  artists: { id: string; name: string }[];
  year?: number;
  cover?: Cover;
}

export interface SearchPlaylistItem {
  type: "playlist";
  id: string;
  title: string;
  author?: string;
  cover?: Cover;
}
//определяет тип результата
export type SearchResult =
  | (Track & {
      type: "track";
      viewer?: { liked: boolean };
    })
  | SearchArtistItem
  | SearchAlbumItem
  | SearchPlaylistItem;

export type ApiSearchItem = SearchResult;
export type ApiArtist = SearchArtistItem;
export type ApiAlbum = SearchAlbumItem;
export type ApiPlaylist = SearchPlaylistItem;

export type SearchResponse = {
  items: ApiSearchItem[];
};


//краткая информация об альбоме для страницы исполнителя
export interface ArtistAlbum {
  id: string;
  title: string;
  year?: number;
  cover?: Cover;
  explicit?: boolean;
  totalTracks?: number;
  trackCount?: number;
}

export type ApiArtistAlbum = ArtistAlbum;

export interface ArtistRelease extends ArtistAlbum {
  releaseType: "single" | "ep";
}

export type ApiArtistRelease = ArtistRelease;

export interface ArtistDetails {
  type: "artist";
  id: string;
  name: string;
  bio?: string;
  cover?: Cover;
  monthlyListeners?: string;
  verified: boolean;
  geniusImageUrl?: string;
  geniusAka?: string[];
  geniusUsername?: string;
  tracks: ApiTrack[];
  albums: ArtistAlbum[];
  singles: ArtistRelease[];
}

export type ApiArtistDetails = ArtistDetails;

//подробная информация об альбоме, включая его треки
export interface AlbumDetails {
  type: "album";
  id: string;
  title: string;
  artists: {
    id: string;
    name: string;
  }[];
  year?: number;
  cover?: Cover;
  trackCount?: number;
  durationMs?: number;
  tracks: ApiTrack[];
}

export type ApiAlbumDetails = AlbumDetails;


//интерфейс, который описывает подробные данные плейлиста из музыкального каталога Liner.
//используется для типизации данных при получении и отображении подробной информации о плейлисте.
export interface CatalogPlaylistDetails {
  type: "playlist";
  id: string;
  title: string;
  author?: string;
  description?: string;
  year?: number;
  cover?: Cover;
  trackCount?: number;
  durationMs?: number;
  tracks: ApiTrack[];
}

export type ApiCatalogPlaylistDetails = CatalogPlaylistDetails;



//описывает музыкальный трек, полученный из радио Liner.
//радио — режим воспроизведения автоматически подобранных треков
export interface RadioTrack {
  id: string;
  title: string;
  artists: { id: string; name: string }[];
  album?: { id: string; title: string };
  durationMs: number;
  cover?: Cover;
  explicit?: boolean;
}

export type ApiRadioTrack = RadioTrack;

//описывает ответ API со списком треков радио
export type RadioResponse = {
  items: ApiRadioTrack[];
};

