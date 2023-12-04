"use client";
import { api } from "@/api";

import { createContext, useState } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";

export type UserFormData = {
  name?: string;
  email: string;
  password: string;
};

type UserContextProps = {
  registerUser: (formData: UserFormData) => Promise<void>;
  loginUser: (formData: UserFormData) => Promise<UserType>;
  user: UserType;
};

type UserType = {
  id: string;
  name: string;
  email: string;
};

interface UserData {
  access_token: string;
  user: UserType;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserData>({
    access_token: "",
    user: {} as UserType,
  });

  const registerUser = async (formData: UserFormData) => {
    try {
      await api.post("/user", formData);

      toast.success("Registro bem-sucedido! Agora você pode fazer login.");
    } catch (error) {
      console.log(error);
      toast.error(
        "Ops! Algo deu errado durante o registro. Por favor, tente novamente."
      );
    }
  };

  const loginUser = async (formData: UserFormData) => {
    try {
      console.log("Ent");
      const response = await api.post("/login", formData);
      console.log(response, " responseee");
      const { access_token, user } = response.data;

      setData({ access_token, user });
      Cookie.set("token", access_token);

      localStorage.setItem("@TOKEN", access_token);
      toast.success("Login bem-sucedido! Bem-vindo ao seu painel.");
      return user;
    } catch (error) {
      toast.error(
        "Login error. Por favor check suas credenciais e tente novamente."
      );
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        user: data.user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
