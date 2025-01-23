import { Button, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  useGetMoviesList,
  useGetMovieActors,
} from "@/react-query/query/movies";
import { useAddMovieActor } from "@/react-query/mutation/movies";
import { useState } from "react";
import MovieActorsList from "./movie-actors-list";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

type movieActorsType = {
  movie: number;
  actors: number;
};
const MovieActors = () => {
  const { Item } = Form;
  const [form] = useForm<movieActorsType>();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const queryClient = useQueryClient();
  const handleChangeMovie = (value: number) => {
    setSelectedMovie(value);
  };

  const { data: moviesList } = useGetMoviesList();
  const { data: Actors } = useGetMovieActors(selectedMovie);
  const { mutate: addActor } = useAddMovieActor();

  const handleSubmit = (values: movieActorsType) => {
    const payload = { m_id: values.movie, act_id: values.actors };
    addActor(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MOVIE_ACTORS],
        });
      },
    });
  };
  return (
    <>
      <Form<movieActorsType>
        name="basic"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<movieActorsType>
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

        <Item<movieActorsType>
          label="Actors"
          name="actors"
          className="w-full"
          rules={[{ required: true, message: "Please choose genre!" }]}
        >
          <Select style={{ width: "50%" }} placeholder="Select genre">
            {Actors?.map((a) => (
              <Select.Option key={a?.id} value={a?.id}>
                {a?.name_ka}
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
        <MovieActorsList />
      </div>
    </>
  );
};

export default MovieActors;
