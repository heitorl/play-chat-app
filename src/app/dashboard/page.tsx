"use client";
import { UserContext } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";

import Sidebar from "@/components/Sidebar";
import { useChatConnection } from "@/socket";
import ChatPublicMessage, { Message } from "@/components/ChatPublicMessage";

const Dashboard = () => {
  const { user, getAllMessages } = useContext(UserContext);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const [messages, setMessages] = useState<Message[]>([]);

  const socket = useChatConnection("public");

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const allMessages = await getAllMessages();
        setMessages(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, [getAllMessages, setMessages]);

  const sendMessage = (value: string) => {
    const newMessage: Message = {
      userName: user.name,
      content: value,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket?.emit("sendMessage", newMessage);
  };

  const messageListener = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    socket?.on("sendMessage", messageListener);
    return () => {
      socket?.off("sendMessage", messageListener);
    };
  }, [socket, messageListener]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex w-full items-center justify-between flex-col bg-gray-200 p-4">
        <h2 className="text-lg w-full text-left font-semibold mb-4">
          Mensagens
        </h2>
        {isPublic && <ChatPublicMessage messages={messages} user={user} />}
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Dashboard;
