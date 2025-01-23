import { Button, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  useGetMoviesList,
  useGetMovieGenres,
} from "@/react-query/query/movies";
import { useAddMovieGenre } from "@/react-query/mutation/movies";
import { useState } from "react";
import MovieGenresList from "./movie-genres-list";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

type movieGenresType = {
  movie: number;
  genres: number;
};
const MovieGenres = () => {
  const { Item } = Form;
  const [form] = useForm<movieGenresType>();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const queryClient = useQueryClient();
  const handleChangeMovie = (value: number) => {
    setSelectedMovie(value);
  };

  const { data: moviesList } = useGetMoviesList();
  const { data: Genres } = useGetMovieGenres(selectedMovie);
  const { mutate: addGenre } = useAddMovieGenre();

  const handleSubmit = (values: movieGenresType) => {
    const payload = { m_id: values.movie, g_id: values.genres };
    addGenre(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MOVIE_GENRES],
        });
      },
    });
  };
  return (
    <>
      <Form<movieGenresType>
        name="basic"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<movieGenresType>
          label="Movies"
          name="movie"
          className="w-full"
          rules={[{ required: true, message: "Please choose genre!" }]}
        >
          <Select
            style={{ width: "50%" }}
            onChange={handleChangeMovie}
            placeholder="Select movie"
          >
            {moviesList?.map((m) => (
              <Select.Option key={m?.id} value={m?.id}>
                {m?.name_ka}
              </Select.Option>
            ))}
          </Select>
        </Item>

        <Item<movieGenresType>
          label="Genres"
          name="genres"
          className="w-full"
          rules={[{ required: true, message: "Please choose genre!" }]}
        >
          <Select style={{ width: "50%" }} placeholder="Select genre">
            {Genres?.map((g) => (
              <Select.Option key={g?.id} value={g?.id}>
                {g?.name_ka}
              </Select.Option>
            ))}
          </Select>
        </Item>

        <Item label={null} className="w-full">
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Item>
      </Form>
      <div>
        <MovieGenresList />
      </div>
    </>
  );
};

export default MovieGenres;
