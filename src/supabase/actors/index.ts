import { supabase } from "..";
import { Database } from "../supabase.types";
import { addActorType, editActorType } from "@/types/actors";

type actorInfo = Database["public"]["Tables"]["actors"]["Row"];

export const getActorsList = async () => {
  return supabase
    .from("actors")
    .select("*")
    .order("created_at", { ascending: false })
    .then((result) => {
      return result?.data as actorInfo[];
    });
};

export const getActorInfo = async (id: number) => {
  return await supabase
    .from("actors")
    .select("*")
    .eq("id", id)
    .then((result) => {
      const res = result?.data ? result?.data[0] : result?.data;
      return res as actorInfo;
    });
};

export const deleteActor = async ({
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
        .from("actors")
        .delete()
        .eq("id", id)
        .then((res) => {
          console.log("delete actor with image");
          return res;
        });
    });
};

export const editActor = async (payload: editActorType) => {
  const id = Number(payload?.id);
  if (payload?.image) {
    const ifImg = payload.current_image.length > 0 ? true : false;
    const imagePath = payload.current_image.replace("movies/", "");

    if (ifImg) {
      await supabase.storage
        .from("movies")
        .remove([imagePath])
        .then(() => {
          return supabase.from("actors").update({ image: "" }).eq("id", id);
        });
    }
    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("actors")
          .update({
            name_ka: payload.name_ka,
            name_en: payload.name_en,
            biography_ka: payload.biography_ka,
            biography_en: payload.biography_en,
            born: payload.born,
            image: res?.data?.fullPath,
            nominations: payload.nominations,
            wins: payload.wins,
            oscar: payload.oscar,
            birth_place_en: payload.birth_place_en,
            birth_place_ka: payload.birth_place_ka,
          })
          .eq("id", id)
          .then((result) => {
            console.log("Actor successfully updated with image: ", result);
          });
      });
  } else {
    return supabase
      .from("actors")
      .update({
        name_ka: payload.name_ka,
        name_en: payload.name_en,
        biography_ka: payload.biography_ka,
        biography_en: payload.biography_en,
        born: payload.born,
        nominations: payload.nominations,
        wins: payload.wins,
        oscar: payload.oscar,
        birth_place_en: payload.birth_place_en,
        birth_place_ka: payload.birth_place_ka,
      })
      .eq("id", id)
      .then((result) => {
        console.log("Actor successfully updated without image: ", result);
      });
  }
};

export const addActor = async (payload: addActorType) => {
  if (payload?.image) {
    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("actors")
          .insert({
            name_ka: payload.name_ka,
            name_en: payload.name_en,
            biography_ka: payload.biography_ka,
            biography_en: payload.biography_en,
            born: payload.born,
            image: res?.data?.fullPath,
            nominations: payload.nominations,
            wins: payload.wins,
            oscar: payload.oscar,
            birth_place_en: payload.birth_place_en,
            birth_place_ka: payload.birth_place_ka,
          })
          .then((result) => {
            console.log("Actor successfully added: ", result);
          });
      });
  }
};
