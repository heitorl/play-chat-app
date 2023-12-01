import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { createValidationSchemaUtil } from "@/utils/createValidationForm.schema";
import * as yup from "yup";
import Input from "./Input";
import { IconType } from "react-icons";

interface FormData {
  [key: string]: any;
}

export interface InputType {
  name: string;
  validation: () => yup.AnySchema;
  icon: IconType;
  label: string;
  placeholder: string;
  type: string;
}

interface FormProps {
  onSubmit: SubmitHandler<FormData>;
  inputs: InputType[];
}

const Form: React.FC<FormProps> = ({ onSubmit, inputs }) => {
  const schema = createValidationSchemaUtil(inputs);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction: SubmitHandler<FormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      className="w-[340px] flex flex-col items-center text-center"
      onSubmit={handleSubmit(onSubmitFunction)}
    >
      {inputs.map((input, index) => (
        <Input
          key={index}
          icon={input.icon}
          label={input.label}
          placeholder={input.placeholder}
          type={input.type}
          register={register}
          name={input.name}
          error={(errors as Record<string, any>)[input.name]?.message}
        />
      ))}
      <div className="w-full py-6 ">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};

export default Form;
