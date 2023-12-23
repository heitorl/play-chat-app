import { UserContext } from "@/providers/userContext";
import { processName } from "@/utils/processName.util";
import { FC, useContext } from "react";
import { FaLessThan } from "react-icons/fa";
import useAvatarUrl from "@/utils/getAvatarForUser";
import Image from "next/image";
import MenuInResponsiveMode from "./MenuInResponsiveMode";

type ChatHeaderProps = {
  openModal: (value: string) => void;
};

const ChatHeader: FC<ChatHeaderProps> = ({ openModal }) => {
  const { user, isPublic, selectedUser, handleGeralClick, selectedUsersList } =
    useContext(UserContext);
  const { avatarUrl } = useAvatarUrl(user);

  const userSelect = selectedUsersList.find(
    (user) => selectedUser?.id === user.id
  );

  let selectedUserAvatar;

  if (userSelect) {
    selectedUserAvatar = userSelect.userWithAvatar?.avatarUrl;
  }

  return (
    <div className="w-full flex justify-between items-center bg-zinc-900 p-4 h-20 lg:hidden">
      <div className="flex items-center">
        {isPublic && avatarUrl && (
          <>
            <div className="relative w-[40px] h-[40px]">
              <Image
                className="w-full rounded-full cursor-pointer object-cover"
                fill
                quality={100}
                src={avatarUrl}
                alt="urlavatar"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("avatar");
                }}
              />
            </div>
            <span className="text-gray-200 font-bold pl-2">
              {processName(user.name)}
            </span>
          </>
        )}
        {!isPublic && (
          <div className="flex items-center w-full">
            <FaLessThan
              onClick={handleGeralClick}
              className="text-gray-200 text-xl pointer"
            />
            {userSelect && (
              <div className="flex items-center justify-center w-full">
                {selectedUserAvatar && (
                  <div className="relative w-[30px] h-[30px] flex ml-3">
                    <Image
                      className="w-full rounded-full cursor-pointer object-cover"
                      fill
                      quality={100}
                      src={selectedUserAvatar}
                      alt="urlavatar"
                    />
                  </div>
                )}
                <span className="text-gray-200 px-2">
                  {processName(userSelect.name)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <MenuInResponsiveMode openModal={openModal} />
    </div>
  );
};

export default ChatHeader;
