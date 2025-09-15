export interface ITWord {
  id: number;
  ru: string;
  en: string;
  photo_url: string;
  photo_urls: string[];
  is_moderated: boolean;
  is_add_later: boolean;
  created_at: string;
}
