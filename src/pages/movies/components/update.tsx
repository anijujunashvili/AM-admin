import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditMovie } from "@/react-query/mutation/movies";
import { useState } from "react";
import dayjs from "dayjs";
import { Database } from "@/supabase/supabase.types";
import { ADMIN_PATHS } from "@/routes/admin/enum";
import { editMovieType } from "@/types/movies";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

type movieType = Database["public"]["Tables"]["movies"]["Row"];
const UpdateMovie: React.FC<{ initialValues: movieType }> = ({
  initialValues,
}) => {
  const { Item } = Form;
  const [form] = useForm<editMovieType>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [releaseDate, setReleaseDate] = useState("");
  const { TextArea } = Input;
  const { mutate: editMovie } = useEditMovie();
  const queryClient = useQueryClient();
  const handleSubmit = (values: editMovieType) => {
    const relDate =
      releaseDate === ""
        ? initialValues.release_date
        : dayjs(releaseDate).format("YYYY-MM-DD");
    const payload = {
      ...values,
      image: image,
      release_date: relDate as string,
      current_image: String(initialValues.image),
      id: initialValues.id,
    };

    editMovie(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_MOVIE_INFO, initialValues.id],
        });
        navigate(`/${ADMIN_PATHS.MOVIES_LIST}`);
      },
    });
  };
  //const handleChange = (info: UploadChangeParam<UploadFile>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    if (info.file) {
      setImage(info.file);
      setIsUploaded(!isUploaded);
      if (info.file.status === "removed") {
        setImage(null);
      }
    }
  };

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setReleaseDate(String(dateString));
  };

  const newArr = {
    ...initialValues,
    release_date: dayjs(initialValues.release_date).format("YYYY-MM-DD"),
    rel_date: dayjs(initialValues.release_date),
  };
  return (
    <>
      <div className="">
        {!isUploaded && (
          <img
            src={
              import.meta.env.VITE_SUPABASE_STORAGE_URL + initialValues.image
            }
            width={350}
            className="border"
          />
        )}
      </div>
      <Form<editMovieType>
        name="basic"
        form={form}
        initialValues={newArr}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<editMovieType>
          name="image"
          className="w-full"
          valuePropName="avatar"
        >
          <Upload
            beforeUpload={() => false}
            name="image"
            accept="image/*"
            multiple={false}
            listType="picture"
            onChange={handleChange}
          >
            {!isUploaded && (
              <Button className="my-4">
                <UploadOutlined />
                Click to Change Photo
              </Button>
            )}
          </Upload>
        </Item>

        <Item<editMovieType>
          label="Name (ka)"
          name="name_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<editMovieType>
          label="Name (en)"
          name="name_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<editMovieType>
          label="Description (ka)"
          name="description_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>
        <Item<editMovieType>
          label="Description (en)"
          name="description_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>

        <Item<editMovieType>
          label="Nominations"
          name="nomination"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<editMovieType>
          label="Awards"
          name="awards"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<editMovieType>
          label="Oscars"
          name="oscars"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<editMovieType>
          label="Trailer"
          name="trailer"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<editMovieType>
          label="Release Date"
          name="rel_date"
          className="w-full"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker onChange={onChange} />
        </Item>

        <Item label={null} className="w-full">
          <Button type="primary" htmlType="submit" className="">
            Edit
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default UpdateMovie;
