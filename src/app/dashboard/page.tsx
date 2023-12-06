"use client";
import { Message, UserContext, UserType } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";

import Sidebar from "@/components/Sidebar";
import ChatPublicMessage from "@/components/ChatPublicMessage";
import ChatPrivateMessage from "@/components/ChatPrivateMessage";

const Dashboard = () => {
  const { user, getAllMessages } = useContext(UserContext);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [chatType, setChatType] = useState<string>("public");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3333", {
      auth: {
        type: chatType,
        userId: user.id,
      },
    });
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
    console.log(selectedUser, "user do sendMessage");
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
      />

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
    </div>
  );
};

export default Dashboard;
