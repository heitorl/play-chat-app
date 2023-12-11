import { Message, UserContext, UserType } from "@/providers/userContext";
import { returnFormatedDate } from "@/utils/formatedDate";
import React, { useContext, useEffect } from "react";

type ChatMessageProps = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  selectedUser: UserType | null;
};

const ChatPrivateMessage: React.FC<ChatMessageProps> = ({
  messages,
  setMessages,
  selectedUser,
}) => {
  const { getPrivateMessages, user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        if (selectedUser) {
          const privateMessages = await getPrivateMessages(
            user.id,
            selectedUser.id
          );

          setMessages(privateMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, [getPrivateMessages, setMessages, selectedUser]);

  return (
    <div className="flex flex-col w-[78%] h-[80%] overflow-y-auto scrollbar fade-in-down">
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
