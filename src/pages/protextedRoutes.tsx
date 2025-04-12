import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
// const token = localStorage.getItem("token");
// return token ? <Outlet /> : <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoutes;


