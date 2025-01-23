import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { deleteReview } from "@/supabase/user-reviews";

export const useDeleteReview = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER_REVIEW],
    mutationFn: deleteReview,
  });
};
