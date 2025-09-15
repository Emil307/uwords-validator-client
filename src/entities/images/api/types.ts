export interface UpdateWordRequestDTO {
  ru?: string;
  en?: string;
  photo_url?: string;
  selected_photo?: string;
  is_moderated?: boolean;
  is_add_later?: boolean;
  is_wrong_translation?: boolean;
}

export interface GetImagesByWordRequestDTO {
  word: string;
  images: string[];
}
