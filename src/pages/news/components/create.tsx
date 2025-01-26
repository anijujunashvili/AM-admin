import { Button, Form, Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useAddNews } from "@/react-query/mutation/news";
import { UploadOutlined } from "@ant-design/icons";
// import { Database } from "@/supabase/supabase.types";
import { useState } from "react";

// type newsType = Database["public"]["Tables"]["news"]["Insert"];
type FieldType = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image: string;
};
const CreateNews = () => {
  const { Item } = Form;
  const [form] = useForm<FieldType>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const { TextArea } = Input;
  const { mutate: addNews } = useAddNews();

  const handleSubmit = (values: FieldType) => {
    const payload = { ...values, image: image };
    console.log(payload);
    addNews(payload, {
      onSuccess: () => {
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
              Click to Upload Photo
            </Button>
          )}
        </Upload>
      </div>
      <Form<FieldType>
        name="basic"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<FieldType>
          label="Title (ka)"
          name="title_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<FieldType>
          label="Title (en)"
          name="title_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<FieldType>
          label="Description (ka)"
          name="description_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>
        <Item<FieldType>
          label="Description (en)"
          name="description_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>
        <Item label={null} className="w-full">
          <Button
            type="primary"
            disabled={!isUploaded}
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Add
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default CreateNews;
