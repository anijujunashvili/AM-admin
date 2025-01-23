import { useNavigate } from "react-router";
import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetMoviesList } from "@/react-query/query/movies";
import { useDeleteMovie } from "@/react-query/mutation/movies";
import dayjs from "dayjs";
import "dayjs/locale/ka";

const MoviesList = () => {
  const navigate = useNavigate();
  const { Column } = Table;

  const { data, isPending, refetch } = useGetMoviesList();
  const { mutate: deleteMovie } = useDeleteMovie();
  const handleNavigateToMovieEdit = (id: string) => {
    navigate(`/movies/update/${id}`);
  };

  const handleDeleteMovie = (id: number, image: string) => {
    const payload = { id: id, image: image };
    deleteMovie(payload, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  return (
    <>
      <Table
        loading={isPending}
        title={() => {
          return (
            <Button type="primary" onClick={() => navigate("/movies/create")}>
              Add Movie <PlusOutlined />
            </Button>
          );
        }}
        bordered
        dataSource={data}
      >
        <Column
          title="Name (ka)"
          dataIndex="name_ka"
          className="font-semibold"
        />
        <Column
          title="Release Date"
          dataIndex="release_date"
          render={(_, row) => {
            return dayjs(row.release_date).locale("ka").format("DD MMM, YYYY");
          }}
        />
        <Column title="Description (ka)" dataIndex="description_ka" />
        <Column title="Oscar" dataIndex="oscars" />
        <Column
          title="Image"
          dataIndex="image"
          render={(_, row) => {
            const imgPath = import.meta.env.VITE_SUPABASE_STORAGE_URL;
            return <img src={`${imgPath}${row.image}`} width="100" />;
          }}
        />
        <Column
          title="Action"
          dataIndex="action"
          render={(_, row) => {
            return (
              <>
                <EditOutlined
                  onClick={() => handleNavigateToMovieEdit(row?.id)}
                  className="mr-3"
                  size={20}
                />
                <DeleteOutlined
                  onClick={() => handleDeleteMovie(row?.id, row?.image)}
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

export default MoviesList;
