import UpdateMovie from "../components/update";
import { useParams } from "react-router-dom";
import { useGetMovieInfo } from "@/react-query/query/movies";
import { Database } from "@/supabase/supabase.types";

type movieType = Database["public"]["Tables"]["movies"]["Row"];

const UpdateMovieView = () => {
  const params = useParams();
  const { data, isPending } = useGetMovieInfo(Number(params.id));

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <UpdateMovie initialValues={data as movieType} />
      )}
    </>
  );
};

export default UpdateMovieView;
