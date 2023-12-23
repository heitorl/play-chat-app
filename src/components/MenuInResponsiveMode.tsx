import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaEllipsisV } from "react-icons/fa";
import { UserContext } from "@/providers/userContext";

type MenuInResponsiveModeProps = {
  openModal: (value: string) => void;
};

const MenuInResponsiveMode: React.FC<MenuInResponsiveModeProps> = ({
  openModal,
}) => {
  const { userLogout } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      openModal("findUser");
      handleClose();
      event.stopPropagation();
    },
    [handleClose, openModal]
  );

  return (
    <div className="flex">
      <FaEllipsisV
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-gray-100 text-xl pointer"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        className=""
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUserClick}>Usuarios</MenuItem>

        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={userLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuInResponsiveMode;
