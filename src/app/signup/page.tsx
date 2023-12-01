"use client";

import * as yup from "yup";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import Form from "@/components/Form";
import Link from "next/link";

const Signup = () => {
  const inputs = [
    {
      name: "name",
      validation: () => yup.string().required("Campo obrigatório!"),
      icon: FiUser,
      label: "Nome",
      placeholder: "Digite seu nome",
      type: "text",
    },
    {
      name: "email",
      validation: () =>
        yup.string().email("Email inválido").required("Campo obrigatório!"),
      icon: FiMail,
      label: "Email",
      placeholder: "Digite seu email",
      type: "email",
    },
    {
      name: "password",
      validation: () =>
        yup
          .string()
          .min(8, "Mínimo de 8 dígitos")
          .required("Campo obrigatório!"),
      icon: FiLock,
      label: "Senha",
      placeholder: "uma senha segura",
      type: "password",
    },
  ];

  const onSubmitFunction = async () => {
    return "";
  };

  return (
    <main className="w-full h-screen flex">
      <div className="flex-1 bg-[50%] bg-zinc-800"></div>

      <div className="flex flex-col items-center justify-center w-full max-w-[800px]">
        <h1 className="text-4xl">Cadastro</h1>

        <Form onSubmit={onSubmitFunction} inputs={inputs} />
        <p>
          Já tem uma conta? Faça o <Link href="/signin">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
