"use client";

import { FiLock, FiMail, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useContext } from "react";
import { UserContext, UserFormData } from "@/providers/userContext";
import Form, { InputType } from "@/components/Form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const inputs: InputType[] = [
  {
    name: "email",
    validation: z
      .string()
      .email("Email inválido")
      .refine((value) => !!value, { message: "Campo obrigatório!" }),
    icon: FiMail,
    label: "Email",
    placeholder: "Digite seu email",
    type: "email",
  },
  {
    name: "password",
    validation: z
      .string()
      .min(8, { message: "Mínimo de 8 dígitos" })
      .refine((value) => !!value, { message: "Campo obrigatório!" }),
    icon: FiLock,
    label: "Senha",
    placeholder: "uma senha segura",
    type: "password",
  },
];
const Signin = () => {
  const { loginUser } = useContext(UserContext);

  const router = useRouter();

  const onSubmitFunction = async (data: UserFormData) => {
    try {
      await loginUser(data);

      console.log("log siginin");

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-full h-screen flex">
      <div className="flex flex-col items-center justify-center w-full max-w-[800px]">
        <div className="w-[340px] text-center text-5xl pb-4">
          <h1 className="text-5xl">Entre com a sua conta</h1>
        </div>

        <Form onSubmit={onSubmitFunction} inputs={inputs} />
        <p>
          Já tem uma conta? Faça o{" "}
          <Link className="text-orange-500" href="/signin">
            Login
          </Link>
        </p>
      </div>
      <div className="flex-1 bg-[50%] bg-zinc-800"></div>
    </main>
  );
};

export default Signin;
