import { supabase } from "..";
import { Database, Tables } from "../supabase.types";
import {
  addMovieType,
  editMovieType,
  infoAboutMovieGenres,
  infoAboutMovieActors,
  addGenres,
  addActors,
} from "@/types/movies";

type movieInfo = Database["public"]["Tables"]["movies"]["Row"];

export const getMoviesList = async () => {
  return supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false })
    .then((result) => {
      return result?.data as movieInfo[];
    });
};

export const deleteMovie = async ({
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
        .from("movies")
        .delete()
        .eq("id", id)
        .then((res) => {
          console.log("delete movie with image");
          return res;
        });
    });
};

export const addMovie = async (payload: addMovieType) => {
  if (payload?.image) {
    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("movies")
          .insert({
            name_ka: payload.name_ka,
            name_en: payload.name_en,
            description_ka: payload.description_ka,
            description_en: payload.description_en,
            release_date: payload.release_date,
            image: res?.data?.fullPath,
            nomination: payload.nomination,
            awards: payload.awards,
            oscars: payload.oscars,
          })
          .then((result) => {
            console.log("Movie successfully added: ", result);
          });
      });
  }
};

export const getMovieInfo = async (id: number) => {
  return await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .then((result) => {
      const res = result?.data ? result?.data[0] : result?.data;
      return res as movieInfo;
    });
};

export const editMovie = async (payload: editMovieType) => {
  const id = Number(payload?.id);
  if (payload?.image) {
    const ifImg = payload.current_image.length > 0 ? true : false;
    const imagePath = payload.current_image.replace("movies/", "");

    if (ifImg) {
      await supabase.storage
        .from("movies")
        .remove([imagePath])
        .then(() => {
          return supabase.from("movies").update({ image: "" }).eq("id", id);
        });
    }
    await supabase.storage
      .from("movies")
      .upload(payload?.image.name, payload?.image)
      .then((res) => {
        return supabase
          .from("movies")
          .update({
            name_ka: payload.name_ka,
            name_en: payload.name_en,
            description_ka: payload.description_ka,
            description_en: payload.description_en,
            release_date: payload.release_date,
            image: res?.data?.fullPath,
            nomination: payload.nomination,
            awards: payload.awards,
            oscars: payload.oscars,
            trailer: payload.trailer,
          })
          .eq("id", id)
          .then((result) => {
            console.log("movie successfully updated with image: ", result);
          });
      });
  } else {
    return supabase
      .from("movies")
      .update({
        name_ka: payload.name_ka,
        name_en: payload.name_en,
        description_ka: payload.description_ka,
        description_en: payload.description_en,
        release_date: payload.release_date,
        nomination: payload.nomination,
        awards: payload.awards,
        oscars: payload.oscars,
        trailer: payload.trailer,
      })
      .eq("id", id)
      .then((result) => {
        console.log("movie successfully updated without image: ", result);
      });
  }
};

export const getMovieGenres = async (m_id: number) => {
  const mGenres = await supabase
    .from("movie_genres")
    .select("g_id")
    .eq("m_id", m_id);

  const genresArray = mGenres.data?.map((g) => g.g_id);

  return await supabase
    .from("genres")
    .select("*")
    .not("id", "in", `(${genresArray})`)
    .then((result) => {
      return result.data as Tables<"genres">[];
    });
};

export const getMovieActors = async (m_id: number) => {
  const mActors = await supabase
    .from("movie_actors")
    .select("act_id")
    .eq("m_id", m_id);

  const actorsArray = mActors.data?.map((a) => a.act_id);

  return await supabase
    .from("actors")
    .select("*")
    .not("id", "in", `(${actorsArray})`)
    .then((result) => {
      return result.data as Tables<"actors">[];
    });
};

export const addMovieGenre = async (payload: addGenres) => {
  await supabase
    .from("movie_genres")
    .insert({
      m_id: payload.m_id,
      g_id: payload.g_id,
    })
    .then((result) => {
      console.log("Movie genre successfully added: ", result);
      return result;
    });
};

export const addMovieActor = async (payload: addActors) => {
  await supabase
    .from("movie_actors")
    .insert({
      m_id: payload.m_id,
      act_id: payload.act_id,
    })
    .then((result) => {
      return result;
    });
};

export const getMovieGenresWithInfo = async () => {
  const result = await supabase
    .from("movie_genres")
    .select("id,movies:m_id ( name_ka ),genres:g_id (name_ka)")
    .order("created_at", { ascending: false });
  return result.data as infoAboutMovieGenres[];
};

export const deleteMovieGenre = async (id: number) => {
  return await supabase.from("movie_genres").delete().eq("id", id);
};

export const deleteMovieActor = async (id: number) => {
  return await supabase.from("movie_actors").delete().eq("id", id);
};

export const getMovieActorsInfo = async () => {
  const result = await supabase
    .from("movie_actors")
    .select("id,movies:m_id ( name_ka ),actors:act_id (name_ka)")
    .order("created_at", { ascending: false });

  return result.data as infoAboutMovieActors[];
};
