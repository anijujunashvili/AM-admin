import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getUserReviews } from "@/supabase/user-reviews";
import { mapUserReviews } from "@/utils/user-reviews";

export const useGetUserReviews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_REVIEWS],
    queryFn: getUserReviews,
    select: mapUserReviews,
  });
};
