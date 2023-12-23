import { FC, useContext } from "react";
import UserAutoComplete from "./userAutoComplete";
import { UserContext, UserType } from "@/providers/userContext";

type FindUserProps = {
  allUsers: UserType[];
};

const FindUserModal: FC<FindUserProps> = ({ allUsers }) => {
  const { handleUserSelect } = useContext(UserContext);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Evita que o clique no conteúdo do modal propague para trás
    console.log("ckucoiu");
    e.stopPropagation();
  };

  return (
    <div
      className=" w-[340px] h-[280px] rounded-md items-center bg-zinc-900 fixed -translate-x-2/4 -translate-y-2/4 z-[1000] left-2/4 top-2/4"
      onClick={handleModalClick}
    >
      <h2 className="text-gray-200 text-xl text-center p-4">
        Converse diretamente com um amigo!
      </h2>
      <div className="p-5">
        <UserAutoComplete allUsers={allUsers} onSelect={handleUserSelect} />
      </div>
    </div>
  );
};

export default FindUserModal;
