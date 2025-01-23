import UpdateNews from "../components/update";
import { useParams } from "react-router-dom";
import { useGetNewsInfo } from "@/react-query/query/news";
import { Database } from "@/supabase/supabase.types";

type newsType = Database["public"]["Tables"]["news"]["Row"];

const NewsUpdateView = () => {
  const params = useParams();

  const { data, isPending } = useGetNewsInfo(Number(params.id));

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <UpdateNews initialValues={data as newsType} />
      )}
    </>
  );
};

export default NewsUpdateView;
