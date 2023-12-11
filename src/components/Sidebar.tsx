import { UserContext, UserType } from "@/providers/userContext";
import UserAutoComplete from "./userAutoComplete";
import { FC, useContext, useEffect, useState } from "react";

import Image from "next/image";
import useAvatarUrl from "@/utils/getAvatarForUser";

type SidebarProps = {
  setIsPublic: (isPublic: boolean) => void;
  setChatType: (chatType: string) => void;
  setSelectedUser: (selectedUser: UserType | null) => void;
  openModal: () => void;
};

const Sidebar: FC<SidebarProps> = ({
  setIsPublic,
  setChatType,
  setSelectedUser,
  openModal,
}) => {
  const { findAllUsers, user, getUserAvatar, userLogout } =
    useContext(UserContext);
  const [selectedUsersList, setSelectedUsersList] = useState<UserType[]>([]);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const avatar = useAvatarUrl(user);

  useEffect(() => {
    const findAllUser = async () => {
      const users = await findAllUsers();
      const filteredUsers = users.filter((u) => u.id !== user.id);
      setAllUsers(filteredUsers);
    };
    findAllUser();
  }, [user]);

  const fetchSelectedUserAvatar = async (user: UserType) => {
    try {
      const response = await getUserAvatar(user.id);
      return response;
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  };

  const handleUserSelect = async (user: UserType | null) => {
    if (user && !selectedUsersList.some((u) => u.id === user.id)) {
      const userWithAvatar = await fetchSelectedUserAvatar(user);
      const newUser = { ...user, userWithAvatar };
      setSelectedUsersList((prevList: any) => [...prevList, newUser]);
    }

    setSelectedUser(user);
    setIsPublic(false);
    setChatType("private");
  };

  const handleSelectUserList = (user: UserType) => {
    setSelectedUser(user);
    setIsPublic(false);
    setChatType("private");
  };
  const handleGeralClick = () => {
    setSelectedUser(null);
    setIsPublic(true);
    setChatType("public");
  };

  return (
    <div className="w-[350px] bg-zinc-900 p-4 !important h-full">
      {/* <h2 className="text-lg text-white font-semibold mb-4">Novo Chat</h2> */}
      <div className="flex flex-col w-full text-gray-200">
        <div className="flex pl-4 pt-2">
          {avatar.avatarUrl && (
            <div className="relative w-[60px] h-[60px]">
              <Image
                className="w-full rounded-full cursor-pointer object-cover"
                fill
                quality={100}
                src={avatar.avatarUrl}
                alt="urlavatar"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              />
            </div>
          )}
          <div className="flex flex-col justify-center pl-4">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="border-b-[gray] border-b border-solid pt-8 w-[80%] m-auto"></div>

        <div className="w-full pt-8">
          <UserAutoComplete allUsers={allUsers} onSelect={handleUserSelect} />
        </div>

        <ul className="flex flex-col pt-8 items-center text-lg h-[640px] overflow-y-auto scrollbar">
          <li
            onClick={handleGeralClick}
            className="py-8 cursor-pointer text-[22px] font-bold"
          >
            Geral
          </li>

          {selectedUsersList.map((selectedUser) => (
            <li
              className="py-4 flex justify-between w-[80%] px-2 border-b-[gray] border-b border-solid "
              key={selectedUser.id}
            >
              {selectedUser.userWithAvatar?.avatarUrl && (
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    className="w-full rounded-full object-cover mr-4"
                    fill
                    quality={100}
                    src={selectedUser.userWithAvatar.avatarUrl}
                    alt="urlavatar"
                  />
                </div>
              )}
              <span
                className="cursor-pointer flex items-center"
                onClick={() => handleSelectUserList(selectedUser)}
              >
                {selectedUser.name}
              </span>
            </li>
          ))}
        </ul>
        <span
          className="text-center font-bold text-xl cursor-pointer"
          onClick={userLogout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
