import React, { ReactNode } from "react";
import { UserProvider } from "./userContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <UserProvider>{children}</UserProvider>
    </>
  );
};

export default Providers;
