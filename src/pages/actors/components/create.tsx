import { Button, Form, Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useAddActor } from "@/react-query/mutation/actors";
import { useState } from "react";
import dayjs from "dayjs";

type FieldType = {
  name_ka: string;
  name_en: string;
  biography_ka: string;
  biography_en: string;
  born: string;
  image: File | null;
  nominations: number;
  wins: number;
  oscar: number;
  birth_place_en: string;
  birth_place_ka: string;
};

const CreateActor = () => {
  const { Item } = Form;
  const [form] = useForm<FieldType>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [born, setBorn] = useState("");
  const { TextArea } = Input;
  const { mutate: addActor } = useAddActor();

  const handleSubmit = (values: FieldType) => {
    const birthDay = dayjs(born).format("YYYY-MM-DD");
    const payload = { ...values, image: image, born: birthDay };
    console.log(payload);
    addActor(payload, {
      onSuccess: () => {
        navigate("/actors");
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
    setBorn(String(dateString));
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
        <Item<FieldType>
          label="Image"
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
              <Button className="my-4 bg-primary hover:bg-primary">
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
          label="Biography (ka)"
          name="biography_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>
        <Item<FieldType>
          label="Biography (en)"
          name="biography_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <TextArea className="w-full" rows={4} />
        </Item>

        <Item<FieldType>
          label="Nominations"
          name="nominations"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Wins"
          name="wins"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Oscars"
          name="oscar"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Birth Place (ka)"
          name="birth_place_ka"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Birth Place (en)"
          name="birth_place_en"
          className="w-full"
          rules={[{ required: true, message: "Please input your text!" }]}
        >
          <Input className="w-full" />
        </Item>

        <Item<FieldType>
          label="Born"
          name="born"
          className="w-full"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker onChange={onChange} />
        </Item>

        <Item label={null} className="w-full">
          <Button
            type="primary"
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

export default CreateActor;
