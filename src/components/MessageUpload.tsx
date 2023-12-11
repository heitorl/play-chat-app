import React, { ReactNode } from "react";

interface UploadMessageProps {
  type?: "default" | "error" | "success";
  children: ReactNode;
}

const UploadMessage: React.FC<UploadMessageProps> = ({
  type = "default",
  children,
}) => {
  const messageColors = {
    default: "#999",
    error: "#FF6666",
    success: "#1E90FF",
  };

  return (
    <div
      className={`flex text-center justify-center items-center font-bold p-5 text-white ${
        type ? `bg-${type}` : "bg-default"
      }`}
      style={{ color: messageColors[type || "default"] }}
    >
      {children}
    </div>
  );
};

export default UploadMessage;
