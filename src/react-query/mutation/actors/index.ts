import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { deleteActor, addActor, editActor } from "@/supabase/actors";

export const useDeleteActor = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_ACTOR],
    mutationFn: deleteActor,
  });
};

export const useAddActor = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_ACTOR],
    mutationFn: addActor,
  });
};

export const useEditActor = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_ACTOR],
    mutationFn: editActor,
  });
};
