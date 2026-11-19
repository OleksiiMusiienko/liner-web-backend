//описывает изображение обложки: адрес, размеры и необязательный резервный адрес.
//универсальный контракт изображения музыкального контента
export interface Cover {
  url: string;
  width: number;
  height: number;
  fallbackUrl?: string;
}

export type ApiCover = Cover;
