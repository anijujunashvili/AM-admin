export type addActorType = {
  name_ka: string;
  name_en: string;
  biography_ka: string;
  biography_en: string;
  born: string;
  image: File | null;
  nominations: number;
  wins: number;
  oscar: number;
  birth_place_en: string;
  birth_place_ka: string;
};

export type editActorType = {
  id: number;
  name_ka: string;
  name_en: string;
  biography_ka: string;
  biography_en: string;
  born: string;
  image: File | null;
  nominations: number;
  wins: number;
  oscar: number;
  birth_place_en: string;
  birth_place_ka: string;
  current_image: string;
};
