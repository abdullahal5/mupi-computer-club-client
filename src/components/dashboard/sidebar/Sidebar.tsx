import { useEffect, useState } from "react";
import { MdArticle, MdBorderVertical, MdClose, MdEvent } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

type SidebarItemProps = {
  icon: JSX.Element;
  text: string;
  expanded: boolean;
  path: string;
  active: boolean;
};

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <aside className="h-full lg:block">
      <nav className="hidden lg:flex h-full flex-col bg-white/15 border-r shadow-sm transition-all duration-300 border-neutral-700">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={` ${
              expanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            <Link to={'/'} className="flex items-center gap-3">
              <img
                src="https://i.ibb.co.com/t8y38K0/logo.png"
                width={expanded ? 40 : 0}
                height={40}
                className="transition-all duration-300"
                alt="Logo"
              />
              <h2
                className={`text-2xl font-semibold transition-all duration-300`}
              >
                MUPICC
              </h2>
            </Link>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg border transition-colors duration-200"
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <ul className="flex-1 space-y-3 px-3">
          <SidebarItem
            icon={<FaHome />}
            text="Dashboard"
            expanded={expanded}
            path="/admin/dashboard"
            active={location.pathname === "/admin/dashboard"}
          />
          <SidebarItem
            icon={<MdEvent />}
            text="Events"
            expanded={expanded}
            path="/admin/dashboard/events"
            active={location.pathname === "/admin/dashboard/events"}
          />
          <SidebarItem
            icon={<AiOutlineClockCircle />}
            text="Sessions"
            expanded={expanded}
            path="/admin/dashboard/sessions"
            active={location.pathname === "/admin/dashboard/sessions"}
          />
          <SidebarItem
            icon={<FiLayers />}
            text="Projects"
            expanded={expanded}
            path="/admin/dashboard/projects"
            active={location.pathname === "/admin/dashboard/projects"}
          />
          <SidebarItem
            icon={<MdArticle />}
            text="Articles"
            expanded={expanded}
            path="/admin/dashboard/articles"
            active={location.pathname === "/admin/dashboard/articles"}
          />
          <SidebarItem
            icon={<HiOutlineUsers />}
            text="Executives"
            expanded={expanded}
            path="/admin/dashboard/executives"
            active={location.pathname === "/admin/dashboard/executives"}
          />
          <SidebarItem
            icon={<IoMdAdd />}
            text="Committee"
            expanded={expanded}
            path="/admin/dashboard/committee"
            active={location.pathname === "/admin/dashboard/committee"}
          />
        </ul>

        <div className="border-t border-neutral-700 flex p-3">
          <img
            src="https://i.ibb.co/MpCfyyL/download.png"
            width={40}
            height={40}
            className="rounded-md"
            alt="Profile Avatar"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Admin</h4>
              <span className="text-xs text-white">johndoe@gmail.com</span>
            </div>
            <MdBorderVertical size={20} className="text-gray-600" />
          </div>
        </div>
      </nav>

      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setIsMobileOpen(true)}
      >
        <FaChevronRight />
      </button>

      <div>
        {/* Overlay */}
        <div
          className={`
      fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
      ${
        isMobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar */}
        <nav
          className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 shadow-lg transform transition-transform duration-300 ease-in-out
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    `}
        >
          <div className="p-4 pb-2 flex justify-between items-center border-b border-gray-200">
            <img
              src="https://i.ibb.co/5T1r5B6/1bffa484777281-5d6786a598010-removebg-preview.png"
              width={40}
              height={40}
              className="transition-all"
              alt="Logo"
            />
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <MdClose className="text-gray-600" fontSize="1.5rem" />
            </button>
          </div>

          <div className="h-full flex flex-col">
            <ul className="flex-1 px-3 py-4 overflow-y-auto">
              <SidebarItem
                icon={<FaHome className="transition-colors duration-200" />}
                text="Dashboard"
                expanded={expanded}
                path="/admin/dashboard"
                active={location.pathname === "/admin/dashboard"}
              />
              <SidebarItem
                icon={<MdEvent className="transition-colors duration-200" />}
                text="Events"
                expanded={expanded}
                path="/admin/dashboard/events"
                active={location.pathname === "/admin/dashboard/events"}
              />
              <SidebarItem
                icon={
                  <AiOutlineClockCircle className="transition-colors duration-200" />
                }
                text="Sessions"
                expanded={expanded}
                path="/admin/dashboard/sessions"
                active={location.pathname === "/admin/dashboard/sessions"}
              />
              <SidebarItem
                icon={<FiLayers className="transition-colors duration-200" />}
                text="Projects"
                expanded={expanded}
                path="/admin/dashboard/projects"
                active={location.pathname === "/admin/dashboard/projects"}
              />
              <SidebarItem
                icon={<MdArticle className="transition-colors duration-200" />}
                text="Articles"
                expanded={expanded}
                path="/admin/dashboard/articles"
                active={location.pathname === "/admin/dashboard/articles"}
              />
              <SidebarItem
                icon={
                  <HiOutlineUsers className="transition-colors duration-200" />
                }
                text="Executives"
                expanded={expanded}
                path="/admin/dashboard/executives"
                active={location.pathname === "/admin/dashboard/executives"}
              />
            </ul>

            {/* Optional Footer */}
            <div className="p-4 border-t border-gray-200/30">
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, expanded, path, active }: SidebarItemProps) {
  return (
    <li
      className={`relative flex items-center my-1 mt-9 font-medium rounded-md cursor-pointer transition-colors duration-200 border border-gray-500 ${
        active
          ? "bg-indigo-100 text-indigo-800"
          : "hover:bg-[#000030] text-white"
      } `}
    >
      <Link to={path} className="flex items-center w-full p-4">
        <span className="text-xl">{icon}</span>
        <span
          className={`overflow-hidden transition-all duration-200 ${
            expanded ? "ml-3" : "hidden"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}
