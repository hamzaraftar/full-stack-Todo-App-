import React, { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function TodoHeader() {
  const [username, setUsername] = useState("");

    useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.get("api/user/");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
    })
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-200 shadow-md">
      <span className="text-xl font-bold uppercase text-blue-700">{username}</span>
      <span>
        <Link
          className="bg-blue-500 inline-block text-white px-3.5 py-1.5 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700"
          to="/logout"
        >
          Logout
        </Link>
      </span>
    </div>
  );
}
