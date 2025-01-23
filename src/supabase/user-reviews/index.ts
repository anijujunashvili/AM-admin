import { supabase } from "..";

import { userReiewsType } from "@/types/reviews";

export const getUserReviews = async () => {
  const result = await supabase
    .from("user_reviews")
    .select("comment,id,m_id,movies:m_id ( name_ka )")
    .order("m_id", { ascending: false });

  return result?.data as userReiewsType[];
};

export const deleteReview = async (id: number) => {
  await supabase
    .from("user_reviews")
    .delete()
    .eq("id", id)
    .then((res) => {
      console.log("delete user review");
      return res;
    });
};
