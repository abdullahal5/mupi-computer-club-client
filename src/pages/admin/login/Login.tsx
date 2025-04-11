/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import { useAppDispatch } from "../../../redux/hook";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const router = useNavigate()

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Logging in...");

    const data = {
      email,
      password,
    };

    const res = await login(data) as any
    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
      toast.dismiss(loadingToastId)
    } else {
      toast.success(res.data.message, {
        duration: 2000,
      });

      const token = res.data?.data?.accessToken;
      const decoded = jwtDecode(token);

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded,
        })
      );

      router("/admin/dashboard");
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-[#071114] rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden transition-colors duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-violet-700 dark:text-violet-400">
            Admin Login
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-violet-400 dark:text-violet-300" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-violet-200 dark:border-gray-700 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 transition-all duration-300 bg-white dark:bg-[#0d2128] text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-violet-400 dark:text-violet-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-lg border-2 border-violet-200 dark:border-gray-700 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 transition-all duration-300 bg-white dark:bg-[#0d2128] text-gray-900 dark:text-gray-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-violet-400 dark:text-violet-300 hover:text-violet-600 dark:hover:text-violet-200 transition-colors duration-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white py-2 rounded-lg hover:from-violet-600 hover:to-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-300 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-center">
              <FaSignInAlt className="mr-2" />
              <span>Login</span>
            </div>
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-300"
          >
            Forgot password?
          </a>
        </div>
        <div className="mt-8 border-t border-violet-100 dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-300"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
