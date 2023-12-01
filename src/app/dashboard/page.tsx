import Input from "@/components/Input";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[350px] bg-zinc-900 p-4 !important">
        <h2 className="text-lg text-white font-semibold mb-4">Novo Chat</h2>
      </div>

      <div className="flex w-full items-center justify-between flex-col bg-gray-200 p-4">
        <h2 className="text-lg w-full text-left font-semibold mb-4">
          Mensagens
        </h2>
        <div className="w-[80%] h-[80%]"></div>
        <Input />
      </div>
    </div>
  );
};

export default Dashboard;
