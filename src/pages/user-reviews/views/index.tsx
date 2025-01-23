import { useDeleteReview } from "@/react-query/mutation/user-reviews";
import { useGetUserReviews } from "@/react-query/query/user-reviews";
import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";

const UserReviewsView = () => {
  const { Column } = Table;
  const { data, isPending, refetch } = useGetUserReviews();
  const { mutate: deleteReview } = useDeleteReview();

  const handleDeleteReview = (id: number) => {
    deleteReview(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  return (
    <>
      <Table loading={isPending} bordered dataSource={data}>
        <Column title="Movie" dataIndex="movie" />
        <Column title="User review" dataIndex="comment" />

        <Column
          title="Action"
          dataIndex="action"
          render={(_, row) => {
            return (
              <>
                <DeleteOutlined
                  onClick={() => handleDeleteReview(row?.id)}
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

export default UserReviewsView;
