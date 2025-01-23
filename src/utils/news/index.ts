import { Tables } from "@/supabase/supabase.types";
import dayjs from "dayjs";

export const mapNewsListForAdmin = (news: Tables<"news">[]) => {
  return news?.map((n) => ({
    id: n?.id,
    title_ka: n?.title_ka,
    title_en: n?.title_en,
    description_ka: n?.description_ka,
    description_en: n?.description_en,
    image: n?.image,
    key: n?.id,
    created_at: dayjs(n?.created_at).format("YYYY-MM-DD HH:mm"),
  }));
};

export const mapNewsInfoForAdmin = (news: Tables<"news">) => {
  return {
    title_ka: news?.title_ka,
    title_en: news?.title_en,
    description_ka: news?.description_ka,
    description_en: news?.description_en,
    created_at: news?.created_at,
    id: news?.id,
    image: news?.image,
    key: news?.id,
  };
};
