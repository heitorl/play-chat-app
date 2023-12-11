"use client";
import { api } from "@/api";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { UploadedFile } from "@/components/UploadAvatarModal";

export type UserFormData = {
  name?: string;
  email: string;
  password: string;
};

export type Message = {
  userName?: string;
  content: string;
  timestamp: Date;
  toUser?: UserType | null;
  fromUserId?: string;
  toUserId?: string;
};

type UserContextProps = {
  registerUser: (formData: UserFormData) => Promise<void>;
  loginUser: (formData: UserFormData) => Promise<void>;
  user: UserType;
  getAllMessages: () => Promise<Message[]>;
  findAllUsers: () => Promise<UserType[]>;
  getPrivateMessages: (userId1: string, userId2: string) => Promise<Message[]>;
  getUserAvatar: (userId: string) => Promise<string>;
  userLogout: () => void;
  requestAvatarUpload: (file: FormData) => Promise<void>;
  setImageUploaded: (data: any) => void;
  imageUploaded: any;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  filename: string | null;
  userWithAvatar: AvatarInfo | null;
};

interface AvatarInfo {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
  blurWidth: number;
  blurHeight: number;
  avatarUrl?: string;
}

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
  const [imageUploaded, setImageUploaded] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    const autoLoginUser = async () => {
      try {
        if (token) {
          const response = await api.get(`/user`);

          setData((prevData) => ({
            access_token: token,
            user: response.data,
          }));
        }
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
      const response = await api.post("/login", formData);

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
      const response = await api.get("/messages");
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const getPrivateMessages = async (userId1: string, userId2: string) => {
    try {
      const response = await api.get(`/private-messages/${userId1}/${userId2}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const getUserAvatar = async (userId: string) => {
    try {
      const response = await api.get(`upload/avatar/${userId}`);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateFile = (data: any) => {
    setImageUploaded((prevData) => ({ ...prevData, ...data }));
  };

  const requestAvatarUpload = async (file: FormData) => {
    try {
      const response = await api.patch(`upload/${data.user.id}`, file, {
        onUploadProgress: (event: any) => {
          const progress = Math.round(
            (event.loaded * 100) / event.total
          ).toString();
          updateFile({ progress });
        },
      });

      updateFile({
        uploaded: true,
        url: response.data,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      updateFile({
        error: true,
      });
    }
  };

  const userLogout = () => {
    setData({
      access_token: "",
      user: {} as UserType,
    });
    localStorage.clear();
    Cookie.remove("token");
    toast.success("Logout bem-sucedido. Até a próxima!");
    window.location.reload();
  };

  const findAllUsers = async () => {
    try {
      const response = await api.get("/user/all");
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
        getPrivateMessages,
        getUserAvatar,
        userLogout,
        requestAvatarUpload,
        setImageUploaded,
        imageUploaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
