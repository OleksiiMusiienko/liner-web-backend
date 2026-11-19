export type {
  PublicUser,
  AuthUser,
  AuthTokens,
  // AuthResult,
  RegisterInput,
  LoginInput,
} from "./auth.js";

export type {
  UserProfile,
  UpdateProfileInput,
} from "./users.js";


export type {
  Cover,
  ApiCover,
} from "./cover.js";

export type {
  TrackArtist,
  TrackAlbum,
  Track,
  ApiTrack,
  TrackDetails,
  ApiTrackDetails,
} from "./track.js";


export {
  SEARCH_TYPES,
} from "./catalog.js";

export type {
  SearchType,
  SearchArtistItem,
  SearchAlbumItem,
  SearchPlaylistItem,
  SearchResult,
  ApiSearchItem,
  SearchResponse,
  ArtistAlbum,
  ApiArtistAlbum,
  ArtistRelease,
  ApiArtistRelease,
  ArtistDetails,
  ApiArtistDetails,
  AlbumDetails,
  ApiAlbumDetails,
  CatalogPlaylistDetails,
  ApiCatalogPlaylistDetails,
  RadioTrack,
  ApiRadioTrack,
  RadioResponse,
  ApiArtist,
  ApiAlbum,
  ApiPlaylist,
} from "./catalog.js";


export type {
  PlaylistSummary,
  ApiPlaylistSummary,
  PlaylistDetails,
  ApiPlaylistDetails,
  UserPlaylist,
  ApiUserPlaylist,
  UserPlaylistItem,
  ApiUserPlaylistItem,
  LikedTracksPage,
  ApiLikedTracksPage,
} from "./playlists.js";


export type {
  PlaybackContextType,
  PlaybackContext,
  RecordPlaybackEventRequest,
  PlaybackHistoryItem,
  PlaybackHistoryResponse,
  PopularTimeWindow,
  PopularTrackItem,
  PopularTracksResponse,
} from "./history.js";
