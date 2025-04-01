import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl mb-3 ">
        Wellcome to
        <span className="relative after:content-[''] after:block after:w-full after:h-[5px] after:bg-gradient-to-r after:from-blue-500 after:via-purple-500 after:to-pink-500 after:absolute after:left-0 after:bottom-0 after:rounded-full">
          Todo app
        </span>
      </h1>
      <h2 className="text-xl">
        <Link to="/login" className="text-blue-500   hover:text-blue-700">
          Login
        </Link>
        <span className="mx-2">or</span>
        <Link
          to="/register"
          className="text-blue-500   hover:text-blue-700 mx-2"
        >
          Register
        </Link>
        to continue
      </h2>
    </div>
  );
}
