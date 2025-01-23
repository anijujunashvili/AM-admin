import { useNavigate } from "react-router";
import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetActorsList } from "@/react-query/query/actors";
import { useDeleteActor } from "@/react-query/mutation/actors";
import dayjs from "dayjs";
import "dayjs/locale/ka";

const ActorsList = () => {
  const navigate = useNavigate();
  const { Column } = Table;

  const { data, isPending, refetch } = useGetActorsList();
  const { mutate: deleteNews } = useDeleteActor();
  const handleNavigateToNewsEdit = (id: string) => {
    navigate(`/actors/update/${id}`);
  };

  const handleDeleteNews = (id: number, image: string) => {
    const payload = { id: id, image: image };
    deleteNews(payload, {
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
            <Button type="primary" onClick={() => navigate("/actors/create")}>
              Add Actor <PlusOutlined />
            </Button>
          );
        }}
        bordered
        dataSource={data}
      >
        <Column title="Name (ka)" dataIndex="name_ka" />
        <Column
          title="Born"
          dataIndex="born"
          render={(_, row) => {
            return dayjs(row.born).locale("ka").format("DD MMM, YYYY");
          }}
        />
        <Column title="Birth Place " dataIndex="birth_place_ka" />
        <Column title="Oscar" dataIndex="oscar" />
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
                  onClick={() => handleNavigateToNewsEdit(row?.id)}
                  className="mr-3"
                  size={20}
                />
                <DeleteOutlined
                  onClick={() => handleDeleteNews(row?.id, row?.image)}
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

export default ActorsList;
