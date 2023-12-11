import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useChatConnection = (chatType: string, dependencies = []) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3333", {
      auth: {
        type: chatType,
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket, chatType, ...dependencies]);

  return socket;
};
