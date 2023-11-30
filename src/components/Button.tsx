import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  whiteSchema?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, whiteSchema, ...rest }) => {
  const buttonClasses = `transition duration-500 ease-in-out h-12 rounded-lg border-2 px-4 border-black text-bold ${
    whiteSchema ? "bg-zinc-200 text-black" : "bg-zinc-800 text-zinc-200"
  }`;

  return (
    <button className={buttonClasses} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;
