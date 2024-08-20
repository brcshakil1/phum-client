import { Form } from "antd";
import Input from "antd/es/input/Input";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
  label?: string;
};

const PHInput = ({ type, name, placeholder, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
