import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 items-center h-16 bg-gray-800 text-white cursor-pointer font-bold text-xl">
      <div>
        <Link to="/">Todo</Link>
      </div>
      <ul className="flex gap-5">
        <li>
          <Link
            className="bg-blue-500 inline-block text-white px-3.5 py-1.5 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="bg-blue-500 inline-block text-white px-3.5 py-1.5 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700"
            to="/register"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
