import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useAddMovie } from "@/react-query/mutation/movies";
import { useState } from "react";
import dayjs from "dayjs";

type FieldType = {
  name_ka: string;
  name_en: string;
  description_ka: string;
  description_en: string;
  trailer: string;
  image: File | null;
  release_date: string;
  nomination: number;
  awards: number;
  oscars: number;
};

const CreateMovie = () => {
  const { Item } = Form;
  const [form] = useForm<FieldType>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [releaseDate, setReleaseDate] = useState("");
  const { TextArea } = Input;
  const { mutate: addMovie } = useAddMovie();

  const handleSubmit = (values: FieldType) => {
    const relDate = dayjs(releaseDate).format("YYYY-MM-DD");
    const payload = { ...values, image: image, release_date: relDate };

    addMovie(payload, {
      onSuccess: () => {
        navigate("/movies");
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
  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setReleaseDate(String(dateString));
  };
  return (
    <>
      <Form<FieldType>
        name="basic"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Item<FieldType> name="image" className="w-full" valuePropName="avatar">
          <Upload
            beforeUpload={() => false}
            name="image"
            accept="image/*"
            multiple={false}
            listType="picture"
            onChange={handleChange}
          >
            {!isUploaded && (
              <Button>
                <UploadOutlined />
                Click to Upload Photo
              </Button>
            )}
          </Upload>
        </Item>

        <Item<FieldType>
          label="Name (ka)"
          name="name_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>
        <Item<FieldType>
          label="Name (en)"
          name="name_en"
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

        <Item<FieldType>
          label="Nominations"
          name="nomination"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Awards"
          name="awards"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Oscars"
          name="oscars"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Trailer"
          name="trailer"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Release Date"
          name="release_date"
          className="w-full"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker onChange={onChange} />
        </Item>

        <Item label={null} className="w-full">
          <Button
            type="primary"
            disabled={!isUploaded}
            htmlType="submit"
            className=""
          >
            Add
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default CreateMovie;
