"use client";
import { UserContext } from "@/providers/userContext";
import { useCallback, useContext, useEffect, useState } from "react";
import InputMessage from "@/components/InputMessage";
import io, { Socket } from "socket.io-client";

type Message = {
  user: string;
  content: string;
  timestamp: Date;
};

const Dashboard = () => {
  const userName = "hector";
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const sendMessage = (value: string) => {
    const newMessage: Message = {
      user: userName,
      content: value,
      timestamp: new Date(),
    };
    socket?.emit("sendMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const messageListener = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

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
        <div className="w-[80%] h-[80%]">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col p-3 my-3 rounded-md ${
                  message.user === "hector"
                    ? "bg-green-100 self-end"
                    : "bg-white"
                }`}
              >
                <span className="text-lg">{message.content}</span>
                <span className="text-[14px] text-gray-400">
                  {message.user}
                </span>
              </div>
            ))}
        </div>
        <InputMessage sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Dashboard;
