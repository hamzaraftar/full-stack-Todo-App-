import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";

export default function Form({ route, method }) {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/todos");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(error.response?.data?.detail || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          {name}
        </h1>

        <input
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Username"
        />

        <input
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
        />

        {loading && (
          <div className="flex justify-center my-2">
            <LoadingIndicator />
          </div>
        )}

        <span className="text-gray-600">
          {method === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            to={method === "login" ? "/register" : "/login"}
            className="text-blue-500 font-medium hover:underline"
          >
            {method === "login" ? "Register" : "Login"}
          </Link>
        </span>
        <button
          className="w-full mt-2 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          {name}
        </button>
      </form>
    </div>
  );
}
