import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetMovieActorsInfo } from "@/react-query/query/movies";
import { useDeleteMovieActor } from "@/react-query/mutation/movies";

const MovieActorsList = () => {
  const { Column } = Table;
  const { data, isPending, refetch } = useGetMovieActorsInfo();
  const { mutate: deleteActor } = useDeleteMovieActor();

  const handleDeleteMovieActor = (id: number) => {
    deleteActor(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <>
      <Table loading={isPending} bordered dataSource={data}>
        <Column
          title="Movie Name (ka)"
          dataIndex="movie"
          className="font-semibold"
        />

        <Column
          title="Genre"
          dataIndex="genre"
          render={(_, row) => {
            return (
              <>
                <div className="text-md cursor-pointer font-bold hover:underline">
                  {row.actor}
                </div>
              </>
            );
          }}
        />

        <Column
          title="Action"
          dataIndex="action"
          render={(_, row) => {
            return (
              <>
                <DeleteOutlined
                  onClick={() => handleDeleteMovieActor(row?.id)}
                  className="text-destructive"
                />
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

export default MovieActorsList;
