import { UserType } from "@/providers/userContext";
import { returnFormatedDate } from "@/utils/formatedDate";
import React from "react";

export type Message = {
  userName: string;
  content: string;
  timestamp: Date;
};

type ChatMessageProps = {
  messages: Message[];
  user: UserType;
};

const ChatPrivateMessage: React.FC<ChatMessageProps> = ({ messages, user }) => {
  return (
    <div className="flex flex-col w-[78%] h-[80%] overflow-y-auto scrollbar">
      {messages &&
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col w-[80%] p-4 my-3 rounded-md ${
              message.userName === user.name
                ? "bg-blue-100 self-end"
                : "bg-white"
            }`}
          >
            <span className="text-lg">{message.content}</span>
            <div className="flex justify-between">
              <span className="text-[14px] text-gray-400">
                {message.userName}
              </span>
              <span className="text-[14px] text-gray-400">
                {returnFormatedDate(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatPrivateMessage;