import UpdateActor from "../components/update";
import { useParams } from "react-router-dom";
import { useGetActorInfo } from "@/react-query/query/actors";
import { Database } from "@/supabase/supabase.types";

type actorType = Database["public"]["Tables"]["actors"]["Row"];

const ActorsUpdateView = () => {
  const params = useParams();
  const { data, isPending } = useGetActorInfo(Number(params.id));

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <UpdateActor initialValues={data as actorType} />
      )}
    </>
  );
};

export default ActorsUpdateView;
