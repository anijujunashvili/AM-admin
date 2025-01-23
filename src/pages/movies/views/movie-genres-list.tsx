import { Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetMovieGenresWithInfo } from "@/react-query/query/movies";
import { useDeleteMovieGenre } from "@/react-query/mutation/movies";

const MovieGenresList = () => {
  const { Column } = Table;
  const { data, isPending, refetch } = useGetMovieGenresWithInfo();
  const { mutate: deleteGenre } = useDeleteMovieGenre();

  const handleDeleteMovieGenre = (id: number) => {
    deleteGenre(id, {
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
                <Tag color="purple" key={1} className="cursor-pointer">
                  {row.genre}
                </Tag>
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
                  onClick={() => handleDeleteMovieGenre(row?.id)}
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

export default MovieGenresList;
