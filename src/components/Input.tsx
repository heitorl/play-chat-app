import React from "react";
import { IconType } from "react-icons";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  icon?: IconType;
  register?: UseFormRegister<any>;
  name: string;
  error?: string;
}

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, icon: Icon, register, name, error, ...rest }) => {
  return (
    <div className="text-left">
      <div>
        {label} {!!error && <span className="text-red-400"> - {error}</span>}
      </div>

      <div className="bg-white text-black w-full flex py-4 rounded-[10px] border-2 border-solid border-[#A9A9A9] focus:outline-orange-500">
        {Icon && <Icon size={30} className="px-1" />}
        <input
          className="items-center text-black border-0 bg-transparent focus:outline-none"
          {...(register && register(name))}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
