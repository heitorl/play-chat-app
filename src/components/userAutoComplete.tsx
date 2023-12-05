import React from "react";
import Select from "react-select";
import { UserType } from "@/providers/userContext";

type UserAutoCompleteProps = {
  allUsers: UserType[];
  onSelect: (selectedUser: UserType | null) => void;
};

const UserAutoComplete: React.FC<UserAutoCompleteProps> = ({
  allUsers,
  onSelect,
}) => {
  const handleSelectUser = (
    selectedOption: { value: string; label: string } | null
  ) => {
    const selectedUserId = selectedOption?.value || null;
    const selectedUser =
      allUsers.find((user) => user.id === selectedUserId) || null;
    onSelect(selectedUser);
  };

  const options = allUsers.map((user) => ({
    value: user.id,
    label: user.email,
  }));
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "rgb(82 82 91)",
      padding: "10px",
      borderRadius: "4px",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "rgb(229 231 235)",
    }),
  };

  return (
    <Select
      className="text-gray-600"
      styles={customStyles}
      options={options}
      onChange={handleSelectUser}
      isSearchable
      placeholder="Busque um usuário"
    />
  );
};

export default UserAutoComplete;
