import { PropsWithChildren } from "react";
import { userAtom } from "../../store/auth";
import { useAtom } from "jotai";
import { Outlet, Navigate } from "react-router-dom";
import { ADMIN_PATHS } from "../admin/enum";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to={"/" + ADMIN_PATHS.LOGIN} />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
