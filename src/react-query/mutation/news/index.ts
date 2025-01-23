import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { updateNews, addNews, deleteNews } from "@/supabase/news";

export const useEditNews = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_NEWS],
    mutationFn: updateNews,
  });
};

export const useAddNews = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_NEWS],
    mutationFn: addNews,
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_NEWS],
    mutationFn: deleteNews,
  });
};
