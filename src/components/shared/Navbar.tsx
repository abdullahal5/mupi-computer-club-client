import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navRoutes } from "../../constants";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed z-50 backdrop-blur-md bg-transparent dark:bg-neutral-900/60 border-2 rounded-r-full rounded-l-full mt-10 mx-auto w-full hidden lg:flex md:flex max-w-7xl border-white/20 py-2 left-0 right-0 transition-all duration-300 ease-in-out">
        <div className="gap-7 text-[.875rem] font-semibold w-full">
          <div className="flex justify-between px-10 items-center">
            <Link
              className="text-2xl p-1 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              to={"/"}
            >
              <img
                className="w-8 transition-all duration-300 hover:rotate-12"
                src="https://i.ibb.co.com/t8y38K0/logo.png"
                alt=""
              />
            </Link>
            <div className="flex items-center justify-between gap-5 tracking-wider">
              {navRoutes.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-1 hover:text-violet-500 duration-300 text-[14px] relative group ${
                    pathname === item.path
                      ? "text-violet-500"
                      : "dark:text-zinc-500"
                  }`}
                >
                  <p>{item.name}</p>
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full ${
                      pathname === item.path ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed z-50 w-full bg-transparent dark:bg-neutral-900/60 backdrop-blur-md lg:hidden md:hidden border-b border-white/20 py-4 px-4 transition-all duration-300">
        <div className="flex justify-between items-center">
          <Link
            className="text-2xl flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            to={"/"}
          >
            <img
              className="w-8 transition-all duration-300 hover:rotate-12"
              src="https://i.ibb.co.com/t8y38K0/logo.png"
              alt=""
            />
            <span className="text-white bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              mupicc
            </span>
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6 animate-spin-in" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
          absolute top-full left-0 right-0 bg-neutral-900/95 backdrop-blur-lg 
          overflow-hidden transition-all duration-500 ease-in-out
          ${
            isMobileMenuOpen
              ? "max-h-96 py-6 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }
        `}
        >
          <div className="px-4">
            <div className="flex flex-col space-y-4">
              {navRoutes.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={`p-2 hover:text-violet-500 duration-300 text-[16px] transform hover:translate-x-2 transition-all ${
                    pathname === item.path ? "text-violet-500" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
