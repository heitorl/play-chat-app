import { UserContext, UserType } from "@/providers/userContext";
import { useContext, useEffect, useState } from "react";

const useAvatarUrl = (user: UserType) => {
  const [avatarUrl, setAvatarUrl] = useState<string | any>("");
  const { getUserAvatar } = useContext(UserContext);

  useEffect(() => {
    async function fetchAvatar() {
      try {
        const response = await getUserAvatar(user.id);
        setAvatarUrl(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAvatar();
  }, [user]);

  return avatarUrl;
};

export default useAvatarUrl;
