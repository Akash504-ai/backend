import React, { useContext, useState } from "react";
import { dataContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { da } from "zod/locales";

const Login = () => {
  let { serverUrl,userData,setUserData,getUserdata } = useContext(dataContext);
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      let {data} = await axios.post(
        serverUrl + "/api/login",
        {
          email,
          password,
        },
        { withCredentials: true });
      // console.log(data);
      setUserData(data.user)
      await getUserdata()
      if(userData){
        navigate("/")
      }
    } catch (error) {
      // console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Log In
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handelLogin}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm placeholder-gray-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm placeholder-gray-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <p className="text-sm text-gray-600 text-center mt-6 flex items-center justify-center">
          Don't have an account?{" "}
          <p
            onClick={() => navigate("/signup")}
            className="ml-1 text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </p>
        </p>
      </div>
    </div>
  );
};

export default Login;
