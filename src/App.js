import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";
import Toast from "./components/Toast";
import useToast from "./hooks/toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import authSlice from "./store/authSlice";

function App() {
  const toasts = useSelector((state) => state.toast.toasts);
  const { deleteToast } = useToast();
  return (
    <Router>
      <NavBar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  route.auth ? (
                    <ProtectedRoute element={route.element} />
                  ) : (
                    <route.element />
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
