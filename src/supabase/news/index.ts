import { supabase } from "..";
import { Database } from "../supabase.types";
import { editNewsWithImage, addNewsWithImage } from "@/types/news";

type newsInfo = Database["public"]["Tables"]["news"]["Row"];

export const getNewsList = async () => {
  return supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .then((result) => {
      return result?.data as Database["public"]["Tables"]["news"]["Row"][];
    });
};

export const getNewsInfo = async (id: number) => {
  const result = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .order("created_at", { ascending: false });
  const res = result?.data ? result?.data[0] : result?.data;
  return res as newsInfo;
};

export const updateNews = async (payload: editNewsWithImage) => {
  const id = Number(payload.id);
  if (payload?.image) {
    const ifImg = payload.current_image.length > 0 ? true : false;
    const imagePath = payload.current_image.replace("movies/", "");

    if (ifImg) {
      await supabase.storage
        .from("movies")
        .remove([imagePath])
        .then(() => {
          return supabase.from("news").update({ image: "" }).eq("id", id);
        });
    }

    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("news")
          .update({
            title_ka: payload.title_ka,
            title_en: payload.title_en,
            description_ka: payload.description_ka,
            description_en: payload.description_en,
            image: res?.data?.fullPath,
          })
          .eq("id", id)
          .then((result) => {
            console.log("Successfully updated news with image: ", result);
          });
      });
  } else {
    return await supabase
      .from("news")
      .update({
        title_ka: payload.title_ka,
        title_en: payload.title_en,
        description_ka: payload.description_ka,
        description_en: payload.description_en,
      })
      .eq("id", id)
      .then((result) => {
        console.log("Successfully updated news without image:", result);
        return result;
      });
  }
};

export const addNews = async (payload: addNewsWithImage) => {
  if (payload?.image) {
    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("news")
          .insert({
            title_ka: payload.title_ka,
            title_en: payload.title_en,
            description_ka: payload.description_ka,
            description_en: payload.description_en,
            image: res?.data?.fullPath,
          })
          .then((result) => {
            console.log("Successfully added news with image: ", result);
          });
      });
  }
};

export const deleteNews = async ({
  id,
  image,
}: {
  id: number;
  image: string;
}) => {
  const imagePath = image.replace("movies/", "");

  await supabase.storage
    .from("movies")
    .remove([imagePath])
    .then(() => {
      return supabase
        .from("news")
        .delete()
        .eq("id", id)
        .then((res) => {
          console.log("delete news with image");
          return res;
        });
    });
};
