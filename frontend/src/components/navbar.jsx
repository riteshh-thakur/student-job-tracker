import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, toggleSidebar } from "@/redux/reducers/sidebarSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, isMobile } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className="fixed bg-white shadow-sm w-full px-4 md:px-8 py-2 z-50">
      <div className="flex items-center gap-3">
        <div className="w-48 lg:w-64 flex justify-between items-center">
          <Link to="/" className="hidden sm:flex items-center gap-2">
            Student Job Tracker
          </Link>
          <button
            className="bg-neutral-100 p-2"
            onClick={() => dispatch(toggleSidebar())}
          >
            {isOpen ? (
              <MdMenu className="text-2xl text-blue-500" />
            ) : (
              <FaArrowRight className="text-2xl text-blue-500" />
            )}
          </button>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search"
              className="w-72 p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            {/* <Link
              to="/notification"
              className="relative p-2 rounded-sm bg-neutral-100 group"
            >
              <FiBell className="text-neutral-600 group-hover:text-blue-500 transition-all duration-300" />
              <div className="absolute rounded-full bg-blue-100 text-blue-500 text-[10px] font-bold w-4 h-4 flex justify-center items-center -top-1 -right-1">
                3
              </div>
            </Link>
            <Link
              to="/messages"
              className="relative p-2 rounded-sm bg-neutral-100 group"
            >
              <HiOutlineMail className="text-neutral-600 group-hover:text-blue-500 transition-all duration-300" />
              <div className="absolute rounded-full bg-red-100 text-red-500 text-[10px] font-bold w-4 h-4 flex justify-center items-center -top-1 -right-1">
                5
              </div>
            </Link> */}
            <div
              onClick={() => navigate("/dashboard/profile")}
              className="flex items-center gap-3"
            >
              <div className="p-2 flex items-center justify-center rounded-sm bg-blue-100">
                <FaUser className="text-blue-600" />
              </div>
              <div className="hidden md:flex flex-col items-start justify-start">
                {/* <p className="text-sm font-semibold">John Doe</p> */}
                <p className="text-sm font-semibold">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
