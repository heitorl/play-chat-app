"use client";
import React, { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  const handleSelectUser = (
    selectedOption: { value: string; label: string } | null
  ) => {
    const selectedUserId = selectedOption?.value || null;
    const selectedUser =
      allUsers.find((user) => user.id === selectedUserId) || null;
    onSelect(selectedUser);
  };

  const options = allUsers?.map((user) => ({
    value: user.id,
    label: user.email,
  }));
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#d1d5db",
      padding: "10px",
      borderRadius: "4px",
      outline: "none",
      borderColor: state.isFocused ? "#FFA500" : "none",
      boxShadow: state.isFocused ? "#FFA500" : "none",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#171717",
    }),
  };

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <Select
      className="text-gray-600"
      styles={customStyles}
      options={options}
      onChange={handleSelectUser}
      isSearchable
      placeholder="Busque um usuário"
    />
  ) : null;
};

export default UserAutoComplete;
