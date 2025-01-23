import { Button, Form, Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { Database } from "@/supabase/supabase.types";
import { useNavigate, useParams } from "react-router-dom";
import { useEditNews } from "@/react-query/mutation/news";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

type newsType = Database["public"]["Tables"]["news"]["Row"];
type editNews = Database["public"]["Tables"]["news"]["Update"];

type FieldType = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image: string;
};
const UpdateNews: React.FC<{ initialValues: newsType }> = ({
  initialValues,
}) => {
  const queryClient = useQueryClient();
  const { Item } = Form;
  const [form] = useForm<FieldType>();
  const params = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const { TextArea } = Input;

  const { mutate: update } = useEditNews();

  const handleSubmit = (values: editNews) => {
    const payload = {
      title_ka: String(values.title_ka),
      title_en: String(values.title_en),
      description_ka: String(values.description_ka),
      description_en: String(values.description_en),
      current_image: String(initialValues.image),
      image: image,
      id: Number(params.id),
    };

    update(payload, {
      onSettled: async () => {
        // await queryClient.invalidateQueries({
        //   queryKey: [QUERY_KEYS.GET_NEWS, 1],
        // });

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_NEWS_INFO, initialValues.id],
        });

        navigate("/news");
      },
    });
  };

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

  return (
    <>
      <div className="flex flex-col space-y-4">
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
        <div className="w-[350px]">
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
        </div>
      </div>

      <Form<FieldType>
        name="basic"
        form={form}
        layout="vertical"
        className="mt-4"
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<FieldType>
          label="Title (ka)"
          name="title_ka"
          rules={[{ required: true, message: "Please input your text!" }]}
          className="w-full"
        >
          <Input className="w-full" />
        </Item>
        <Item<FieldType>
          label="Title (en)"
          name="title_en"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<FieldType>
          label="Description (ka)"
          name="description_ka"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea rows={4} />
        </Item>
        <Item<FieldType>
          label="Description (en)"
          name="description_en"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea rows={4} className="w-full" />
        </Item>

        <Item label={null}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default UpdateNews;
