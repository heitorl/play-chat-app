import { UserContext, UserType } from "@/providers/userContext";
import UserAutoComplete from "./userAutoComplete";
import { useContext, useEffect, useState } from "react";
import { useChatConnection } from "@/socket";

const Sidebar = () => {
  const { findAllUsers } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    const findAllUser = async () => {
      const users = await findAllUsers();

      setAllUsers(users);
    };
    findAllUser();
  }, []);

  const handleUserSelect = (user: UserType | null) => {
    setSelectedUser(user);

    const socket = useChatConnection("private");
  };

  return (
    <div className="w-[350px] bg-zinc-900 p-4 !important">
      <h2 className="text-lg text-white font-semibold mb-4">Novo Chat</h2>
      <div className="flex flex-col w-full text-gray-200">
        <div className="flex flex-col">
          <span>Heitor L</span>
          <span>Heitorl@email.com</span>
        </div>
        <div className="border-b-[gray] border-b border-solid pt-8 w-[80%] m-auto"></div>

        <div className="w-full pt-8">
          <UserAutoComplete allUsers={allUsers} onSelect={handleUserSelect} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
