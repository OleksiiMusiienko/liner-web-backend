
import type { Track } from "./track.js";
//контракты событий воспроизведения и истории прослушивания пользователя Liner.

// Источник, из которого пользователь запустил трек.
export type PlaybackContextType =
  | "album"
  | "playlist"
  | "radio"
  | "search"
  | "library"
  | "explore"
  | "direct";

  //Источник воспроизведения и его ID
export interface PlaybackContext {
  type: PlaybackContextType | string;
  id?: string;
}

// Контракт запроса на запись события прослушивания.
//данные, которые отправляем серверу.
export interface RecordPlaybackEventRequest {
  playbackSessionId: string;
  listeningSessionId: string;
  trackId: string;
  trackSnapshot?: Track;
  playedDurationMs: number;
  trackDurationMs?: number;
  completionRate: number;
  completed?: boolean;
  skipped?: boolean;
  loopCount?: number;
  hasSeekBackward?: boolean;
  context?: PlaybackContext;
}



// Одна запись в истории прослушивания пользователя.
export interface PlaybackHistoryItem {
  id: string;
  playbackSessionId: string;
  listeningSessionId: string;
  track: Track;
  playedDurationMs: number;
  completionRate: number;
  completed: boolean;
  skipped: boolean;
  loopCount: number;
  hasSeekBackward: boolean;
  context?: PlaybackContext;
  listenedAt: string;
}

// Ответ API со списком прослушанных треков. данные, которые получаем от сервера.
export interface PlaybackHistoryResponse {
  items: PlaybackHistoryItem[];
  nextCursor: string | null;
}



export type PopularTimeWindow =
  | "24h"
  | "7d"
  | "30d"
  | "all";

// Один трек в рейтинге популярности.
export interface PopularTrackItem {
  rank: number;
  track: Track;
  playCount: number;
  uniqueListeners: number;
  score: number;
  viewer?: {
    liked: boolean;
  };
}

// Ответ API с рейтингом популярных треков.
export interface PopularTracksResponse {
  window: PopularTimeWindow;
  generatedAt: string;
  items: PopularTrackItem[];
}
