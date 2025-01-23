import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getActorsList, getActorInfo } from "@/supabase/actors";
import { mapActorsListForAdmin } from "@/utils/actors";

export const useGetActorsList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTORS],
    queryFn: getActorsList,
    select: mapActorsListForAdmin,
  });
};

export const useGetActorInfo = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTORS_INFO, id],
    queryFn: () => getActorInfo(id),
  });
};
