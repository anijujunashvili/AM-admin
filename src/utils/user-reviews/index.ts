import { userReiewsType } from "@/types/reviews";

export const mapUserReviews = (reviews: userReiewsType[]) => {
  return reviews?.map((r) => ({
    id: r?.id,
    comment: r?.comment,
    movie: r?.movies?.name_ka,
    key: r?.id,
  }));
};
