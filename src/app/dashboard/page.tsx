"use client";
import { UserContext } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";
import { Message } from "@/components/ChatMessage";

import ChatMessage from "@/components/ChatMessage";

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
      <div className="w-[350px] bg-zinc-900 p-4 !important">
        <h2 className="text-lg text-white font-semibold mb-4">Novo Chat</h2>
        <div className="flex flex-col w-full text-gray-200">
          <span>Heitor L</span>
          <span>Heitorl@email.com</span>
        </div>
      </div>

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
