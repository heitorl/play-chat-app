import { useEffect, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (isModalOpen && e.target.closest(".modal")) {
        return;
      }

      closeModal();
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);

  return { isModalOpen, openModal, closeModal };
};
