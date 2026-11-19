
import type { Cover } from "./cover.js";
import type { Track, ApiTrack } from "./track.js";

// Краткая информация о плейлисте.
export interface PlaylistSummary {
  id: string;
  title: string;
  description?: string;
  revision: number;
  trackCount: number;
  durationMs: number;
  cover?: Cover;
  createdAt: string;
  updatedAt: string;
}

export type ApiPlaylistSummary = PlaylistSummary;

// Плейлист с полным списком треков.
export interface PlaylistDetails extends PlaylistSummary {
  tracks: Track[];
}

export type ApiPlaylistDetails = PlaylistDetails;

// Пользовательский плейлист и его владелец.
export interface UserPlaylist {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  revision: number;
  ownerId?: string;
  owner?: {
    id: string;
    username?: string | null;
    displayName?: string | null;
    avatarUrl?: string | null;
  };
}

export type ApiUserPlaylist = UserPlaylist;

// Один трек в пользовательском плейлисте.
export interface UserPlaylistItem {
  id: string;
  track: ApiTrack;
  position: number;
  addedAt: string;
}

export type ApiUserPlaylistItem = UserPlaylistItem;

// Страница понравившихся треков.
export interface LikedTracksPage {
  items: {
    track: ApiTrack;
    likedAt: string;
  }[];
  nextCursor: string | null;
}

export type ApiLikedTracksPage = LikedTracksPage;
