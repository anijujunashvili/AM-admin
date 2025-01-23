import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getNewsList, getNewsInfo } from "@/supabase/news";
import { mapNewsListForAdmin, mapNewsInfoForAdmin } from "@/utils/news";

export const useGetNewsList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS],
    queryFn: getNewsList,
    select: mapNewsListForAdmin,
  });
};

export const useGetNewsInfo = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS_INFO, id],
    queryFn: () => getNewsInfo(id),
    select: mapNewsInfoForAdmin,
  });
};
