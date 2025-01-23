import { useNavigate } from "react-router";
import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetNewsList } from "@/react-query/query/news";
import { useDeleteNews } from "@/react-query/mutation/news";

const NewsList = () => {
  const navigate = useNavigate();
  const { Column } = Table;

  const { data, isPending, refetch } = useGetNewsList();
  const { mutate: deleteNews } = useDeleteNews();
  const handleNavigateToNewsEdit = (id: string) => {
    navigate(`/news/update/${id}`);
  };

  const handleDeleteNews = (id: number, image: string) => {
    const payload = { id, image };
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
            <Button type="primary" onClick={() => navigate("/news/create")}>
              Add News <PlusOutlined />
            </Button>
          );
        }}
        bordered
        dataSource={data}
      >
        <Column title="Title (ka)" dataIndex="title_ka" />
        <Column title="Created At" dataIndex="created_at" />
        <Column title="description (ka)" dataIndex="description_ka" />
        <Column
          title="Image"
          dataIndex="image"
          render={(_, row) => {
            const imgPath = import.meta.env.VITE_SUPABASE_STORAGE_URL;
            return <img src={`${imgPath}${row.image}`} width={400} />;
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

export default NewsList;
