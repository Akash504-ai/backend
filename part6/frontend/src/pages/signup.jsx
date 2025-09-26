import React, { useContext, useState } from "react";
import { dataContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let { serverUrl, userData, setUserData, getUserdata } =
    useContext(dataContext);
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Image states
  const [frontendIMG, setFrontendIMG] = useState(null); // preview
  const [backendIMG, setBackendIMG] = useState(null); // file for backend

  const handelSingUp = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      if (backendIMG) formData.append("profileImage", backendIMG);

      let { data } = await axios.post(serverUrl + "/api/signup", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      await getUserdata();
      setUserData(data.user);
      navigate("/");
      // console.log("Signup success:", data);
    } catch (error) {
      console.log("Signup error:", error.message);
    }
  };

  // 📌 Handle Image Upload
  const handelImage = (e) => {
    let file = e.target.files[0];
    setBackendIMG(file);
    let image = URL.createObjectURL(file);
    setFrontendIMG(image);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handelSingUp}>
          {/* Upload Image */}
          <div className="flex justify-center">
            <label className="w-22 h-26 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-indigo-500 transition relative overflow-hidden">
              <input type="file" className="hidden" onChange={handelImage} />
              {frontendIMG ? (
                <img
                  src={frontendIMG}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="Upload"
                    className="w-10 h-10 opacity-60"
                  />
                  <span className="text-xs text-gray-500 mt-1">Upload</span>
                </>
              )}
            </label>
          </div>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-600 text-center mt-4 flex">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="ml-1 text-indigo-600 font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
