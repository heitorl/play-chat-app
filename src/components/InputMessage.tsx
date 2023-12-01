import { LuSendHorizonal } from "react-icons/lu";

const InputMessage = () => {
  return (
    <div className="w-[80%] p-4 flex justify-center">
      <div className="w-full h-20 flex justify-end bg-white relative items-center  rounded-md">
        <input
          type="text"
          className="w-full h-20 p-2 flex-1 border-gray-300 focus:outline-orange-400"
          placeholder="Digite sua mensagem..."
        />
        <LuSendHorizonal className="absolute text-2xl cursor-pointer transform -translate-y-1/2 mt-[25px] mb-0 mx-5" />
      </div>
    </div>
  );
};

export default InputMessage;
