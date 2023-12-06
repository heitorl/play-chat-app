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
    name: "name",
    validation: z
      .string()
      .refine((value) => !!value, { message: "Campo obrigatório!" }),
    icon: FiUser,
    label: "Nome",
    placeholder: "Digite seu nome",
    type: "text",
  },
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
const Signup = () => {
  const { registerUser } = useContext(UserContext);

  const router = useRouter();

  const onSubmitFunction = async (data: UserFormData) => {
    await registerUser(data);
    router.push("/");
  };

  return (
    <main className="w-full h-screen flex">
      <div className="flex-1 bg-[50%] bg-zinc-800"></div>

      <div className="flex flex-col items-center justify-center w-full max-w-[800px]">
        <h1 className="text-4xl">Cadastro</h1>

        <Form onSubmit={onSubmitFunction} inputs={inputs} />
        <p>
          Já tem uma conta? Faça o{" "}
          <Link className="text-orange-500" href="/signin">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
