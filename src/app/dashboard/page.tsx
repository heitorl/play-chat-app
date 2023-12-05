"use client";
import { UserContext } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";
import { Message } from "@/components/ChatMessage";

import ChatMessage from "@/components/ChatMessage";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const { user, getAllMessages } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const allMessages = await getAllMessages();
        console.log(allMessages, "alll");
        setMessages(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, [getAllMessages, setSocket, setMessages]);

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
        <ChatMessage messages={messages} user={user} />
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Dashboard;
