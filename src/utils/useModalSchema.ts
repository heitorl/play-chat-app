import { useEffect, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const openModal = (value: string) => {
    setIsModalOpen(true);
    setType(value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      const modalElement = document.getElementById("modal");

      if (isModalOpen && modalElement && !modalElement.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);

  return { isModalOpen, openModal, closeModal, type };
};
