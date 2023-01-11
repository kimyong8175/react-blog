import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ element }) => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!loggedIn) {
    <Navigate to="/" />;
  }
  return element;
};

export default ProtectedRoute;
