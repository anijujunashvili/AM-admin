export type NewsInfoType = {
  id: number;
  created_at: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  images: string;
  key: number;
};

export type editNewsWithImage = {
  title_ka: string | undefined;
  title_en: string | undefined;
  description_ka: string | undefined;
  description_en: string | undefined;
  image: File | null;
  current_image: string;
  id?: number;
  created_at?: string;
};

export type addNewsWithImage = {
  title_ka: string | undefined;
  title_en: string | undefined;
  description_ka: string | undefined;
  description_en: string | undefined;
  image: File | null;
};
