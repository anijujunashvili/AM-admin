import { Button, Form, Input, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditActor } from "@/react-query/mutation/actors";
import { useState } from "react";
import dayjs from "dayjs";
import { Database } from "@/supabase/supabase.types";
import { ADMIN_PATHS } from "@/routes/admin/enum";
//import { UploadFile, UploadChangeParam } from "antd/es/upload/interface";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";
import { addActorType } from "@/types/actors";

type FieldType = addActorType;

type actorType = Database["public"]["Tables"]["actors"]["Row"];
const UpdateActor: React.FC<{ initialValues: actorType }> = ({
  initialValues,
}) => {
  const { Item } = Form;
  const [form] = useForm<FieldType>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [bornD, setBornD] = useState("");
  const { TextArea } = Input;
  const { mutate: editActor } = useEditActor();
  const queryClient = useQueryClient();
  const handleSubmit = (values: FieldType) => {
    const birthDay =
      bornD !== "" ? dayjs(bornD).format("YYYY-MM-DD") : initialValues.born;

    const payload = {
      ...values,
      current_image: String(values.image),
      image: image,
      born: String(birthDay),
      id: initialValues.id,
    };

    editActor(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ACTORS_INFO, initialValues.id],
        });
        navigate(`/${ADMIN_PATHS.ACTORS_LIST}`);
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
    setBornD(String(dateString));
  };

  const newArr = {
    ...initialValues,
    born: dayjs(initialValues.born),
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
      <Form<FieldType>
        name="basic"
        form={form}
        layout="vertical"
        initialValues={newArr}
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
              <Button type="primary" className="my-4">
                <UploadOutlined />
                Click to Change Photo
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
            Edit
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default UpdateActor;
