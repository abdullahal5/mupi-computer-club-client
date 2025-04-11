import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
