import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong, FaLock, FaUser } from "react-icons/fa6";
import { FaRegEyeSlash, FaSignInAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginPassword, submitFormData } from "@/api/Reqest";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { permission_details } from "@/utils";
import bgImage from "../../../assets/loginPageImage/loginPageImg.jpg";
import logo from "../../../assets/loginPageImage/sdf-logo.png";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const onSubmit = async (data: any) => {
    localStorage.clear();
    const { username, password } = data;

    try {
      setLoading(true);
      setError("");
      const response: any = await loginPassword({ username, password });
      if (response?.data?.accessToken) {
        const token = response?.data?.accessToken;
        toast.success("Login successful!");
        localStorage.setItem(
          "customer_login_auth",
          JSON.stringify(response.data),
        );
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (rememberMe) {
          setCookie("username", { username, password }, 7);
        }
        setTimeout(() => {
          window.location.href = window.location.origin + "/admin";
        }, 500);
      } else {
        toast.error(response?.data?.message || "Login failed.");
        // console.log("response?.data?.message", response?.data?.message);
      }
    } catch (error) {
      console.log("Error toast about to trigger", error);
      toast.error("Login failed.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex  justify-end max-h-screen bg-gray-100 bg-cover bg-center items-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className=" flex justify-end gap-5 h-[700px] w-[800px] bg-overlay  ">
        {/* Login Card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col items-center gap-6  w-[800px]  p-8 shadow-lg ">
            {/* Logo */}
            <div className="flex flex-col items-center text-white font-bold pt-24 pl-44">
              <img
                src={logo} // Replace with the actual logo path
                alt="SDF Logo"
                className="h-auto w-24"
              />
              <h1 className="text-2xl  mt-4 text-center ">
                Account Management System
              </h1>
              <p className="text-lg ">For SDF</p>
            </div>

            {/* Input Fields */}
            <div className="w-full max-w-sm text-white  ml-40">
              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white text-gray-800">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className=" p-2 outline-none sm:w-full md:w-full lg:w-full xl:w-full xs:w-1/2"
                  />
                  {errors.username && (
                    <p className="text-white font-semibold">
                      {errors?.username?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white text-gray-800">
                  <FaLock className="text-gray-400 mr-2" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="flex-grow p-2 outline-none bg-transparent"
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-6 right-3 text-black cursor-pointer"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-6 right-3 text-black cursor-pointer"
                    />
                  )}
                  {errors.password && (
                    <p className="text-white font-semibold">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 accent-blue-500"
                  onClick={(e: any) => setrememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="text-sm text-text">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg flex items-center justify-center">
                <FaSignInAlt className="text-white mr-2" />
                {loading ? "Loading..." : "Login"}
              </button>
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className=" text-sm text-gray-400 ml-40 mt-10">
              Designed & Developed by{" "}
              <span className="font-bold text-lg text-white font-family: 'Berlin Sans FB'">
                Nanosoft
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
