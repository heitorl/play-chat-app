"use client";
import { api } from "@/api";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { Message } from "@/components/ChatMessage";

export type UserFormData = {
  name?: string;
  email: string;
  password: string;
};

type UserContextProps = {
  registerUser: (formData: UserFormData) => Promise<void>;
  loginUser: (formData: UserFormData) => Promise<void>;
  user: UserType;
  getAllMessages: () => Promise<Message[]>;
  findAllUsers: () => Promise<UserType[]>;
};

export type UserType = {
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

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    const autoLoginUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await api.get(`/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData((prevData) => ({
          access_token: token || "",
          user: response.data,
        }));
        // navigate(pathname);
      } catch (error) {
        console.log(error);
      }
    };

    autoLoginUser();
  }, []);

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
    } catch (error) {
      toast.error(
        "Login error. Por favor check suas credenciais e tente novamente."
      );
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await api.get("/messages", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const findAllUsers = async () => {
    try {
      const response = await api.get("/user/all", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        user: data.user,
        getAllMessages,
        findAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
