import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    <div></div>;
  }

  if (!signed) {
    return <Navigate to="/signIn" />;
  }

  return children;
}
