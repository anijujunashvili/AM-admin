import { Tables } from "@/supabase/supabase.types";

export const mapActorsListForAdmin = (actors: Tables<"actors">[]) => {
  return actors?.map((act) => ({
    name_ka: act.name_ka,
    name_en: act.name_en,
    biography_ka: act.biography_ka,
    biography_en: act.biography_en,
    born: act.born,
    image: act.image,
    nominations: act.nominations,
    wins: act.wins,
    oscar: act.oscar,
    birth_place_en: act.birth_place_en,
    birth_place_ka: act.biography_ka,
    id: act.id,
    key: act.id,
  }));
};
