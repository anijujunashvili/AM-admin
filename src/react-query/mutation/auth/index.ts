import { MUTATION_KEYS } from "../enum";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../supabase/auth";

export const useSignIn = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
  });
};
