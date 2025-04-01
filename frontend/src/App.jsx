import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFount from "./pages/NotFount";
import Todos from "./pages/Todos";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
