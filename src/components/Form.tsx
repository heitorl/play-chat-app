"use client";

import Button from "./Button";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "./Input";
import { IconType } from "react-icons";
import { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export interface InputType {
  name: string;
  validation: z.ZodType<any, any, any>;
  icon?: IconType;
  label: string;
  placeholder: string;
  type: string;
}
interface FormProps {
  onSubmit: SubmitHandler<IFormInput>;
  inputs: InputType[];
}

const Form: FC<FormProps> = ({ onSubmit, inputs }) => {
  const validationSchema = z.object(
    inputs.reduce((acc, input) => {
      acc[input.name] = input.validation;
      return acc;
    }, {} as Record<string, z.ZodType<any, any, any>>)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <form
      className="w-[340px] flex flex-col items-center text-center"
      onSubmit={handleSubmit(onSubmit)}
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
