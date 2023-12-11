"use client";
import { Message, UserContext, UserType } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";

import Sidebar from "@/components/Sidebar";
import ChatPublicMessage from "@/components/ChatPublicMessage";
import ChatPrivateMessage from "@/components/ChatPrivateMessage";
import { useModal } from "@/utils/useModalSchema";
import Backdrop from "@/components/Backdrop";
import UpdloadAvatar from "@/components/UploadAvatarModal";

const Dashboard = () => {
  const { user, getAllMessages } = useContext(UserContext);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [chatType, setChatType] = useState<string>("public");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const { isModalOpen, openModal } = useModal();

  useEffect(() => {
    const newSocket = io(
      "https://play-for-a-cause-chat-server-production.up.railway.app",
      {
        auth: {
          type: chatType,
          userId: user.id,
        },
      }
    );
    setSocket(newSocket);
    const event =
      chatType === "public" ? "sendPublicMessage" : "sendPrivateMessage";

    newSocket.on(event, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket, chatType]);

  const sendMessage = (value: string) => {
    const newMessage: Message = {
      userName: user.name,
      content: value,
      timestamp: new Date(),
      toUser: selectedUser,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const event =
      chatType === "public" ? "sendPublicMessage" : "sendPrivateMessage";

    socket?.emit(event, newMessage);
  };
  return (
    <div className="flex h-screen">
      <Sidebar
        setIsPublic={setIsPublic}
        setChatType={setChatType}
        setSelectedUser={setSelectedUser}
        openModal={openModal}
      />
      <div className="fixed -translate-x-2/4 -translate-y-2/4 z-[1000] left-2/4 top-2/4">
        {isModalOpen && <UpdloadAvatar />}
      </div>
      <div className="flex w-full items-center justify-between flex-col bg-gray-200 p-4">
        <h2 className="text-lg w-full text-left font-semibold mb-4">
          Mensagens
        </h2>
        {isPublic ? (
          <ChatPublicMessage
            messages={messages}
            setMessages={setMessages}
            user={user}
          />
        ) : (
          <ChatPrivateMessage
            messages={messages}
            setMessages={setMessages}
            selectedUser={selectedUser}
          />
        )}
        <InputMessage sendMessage={sendMessage} />
      </div>
      {isModalOpen && <Backdrop />}
    </div>
  );
};

export default Dashboard;
