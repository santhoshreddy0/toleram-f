import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isManager } from "../../Utils/Helpers";

export default function AdminOnlyRoute({ children }) {
  const token = useSelector((state) => state.auth.JWTtoken);

  if (isManager(token)) {
    return <Navigate to="/admin/teams" replace />;
  }

  return children;
}
