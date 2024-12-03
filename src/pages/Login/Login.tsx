import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginImage from "../../../assets/loginPageImage/register.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginPassword, submitFormData } from "@/api/Reqest";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { permission_details } from "@/utils";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="flex justify-center items-center xs:flex-col md:flex-col lg:flex-row p-5">
          {/* left side */}
          <div className="flex xs:flex-row rounded-[25px]">
            <img
              className="w-full xs:min-w-[500px] md:max-w-[400px] lg:max-w-[600px] lg:h-[507px] xl:h-[550px] object-cover object-center text-white
          xl:rounded-tl-3xl xl:rounded-bl-3xl
          lg:rounded-tl-3xl lg:rounded-bl-3xl
          md:rounded-tl-3xl md:rounded-bl-3xl
          xs:rounded-tl-3xl xs:rounded-bl-3xl"
              src={LoginImage}
              alt="Login Visual"
            />
          </div>
          {/* right side */}
          <div className="flex flex-col justify-start items-start xs:min-[150px] lg:h-[507px] xl:h-[550px]  border-2 bg-primaryColor border-none text-white rounded-tr-3xl rounded-br-3xl px-2">
            <div className=" xs:px-5 xs:mt-5   md:px-5 md:mt-5  lg:px-10 lg:mt-10 xl:px-10 xl:mt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-semibold text-start text-3xl">
                  Login To Your Account
                </h3>
                <div className="w-[432px]">
                  <div className="my-5">
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Email/Mobile"
                      className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                    />
                    {errors.username && (
                      <p className="text-white font-semibold">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="xs:w-full md:w-full lg:w-full xl:w-full p-5 border border-gray-400 rounded-lg text-black"
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
                  </div>
                  {errors.password && (
                    <p className="text-white font-semibold">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="flex items-center space-x-1 mt-10">
                    <input
                      className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                      type="checkbox"
                      onClick={(e: any) => setrememberMe(e.target.checked)}
                    />
                    <p className="leading-6">Remember me</p>
                  </div>

                  <button
                    type="submit"
                    animate-spin
                    className="xs:w-1/2 md:w-full lg:w-full xl:w-full p-4 mt-10 rounded-md bg-[#ffcc1d] text-black font-bold"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                  {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                  )}
                  {/* <p className="text-center mt-5 mb-10">
                    Not an account yet?
                    <Link to={'/register'}>
                      <span className="text-[#ffcc1d] underline cursor-pointer ml-1 hover:font-bold">Register</span>
                    </Link>
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </motion.div>
  );
};

export default Login;
