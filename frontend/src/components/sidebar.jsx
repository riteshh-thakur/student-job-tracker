import { logout } from "@/redux/reducers/authSlice";
import React from "react";
import toast from "react-hot-toast";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SiReacthookform } from "react-icons/si";
import { GiMedicines } from "react-icons/gi";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FiTrello } from "react-icons/fi";
import sidebarSupportImg from '../assets/images/sidebar-support-img.svg';
import { LuCalendarRange } from "react-icons/lu";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const role = user?.role;

  // Define role-based menu items
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LuLayoutDashboard,
      roles: ["admin", "user"],
    },
    // {
    //   label: "Job Application",
    //   path: "/dashboard/attendant-list",
    //   icon: LuNotebookPen,
    //   roles: ["admin"],
    // },
    {
      label: "Job Applications",
      path: "/dashboard/event-list",
      icon: LuCalendarRange,
      roles: ["admin"],
    },
    // {
    //   label: "View Application",
    //   path: "/dashboard/task-tracker",
    //   icon: GiMedicines,
    //   roles: ["admin"],
    // },

    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: FaRegUser,
      roles: ["admin", "user"],
    },
    // {
    //   label: "Logout",
    //   path: "/dashboard/logout",
    //   icon: LuLogOut,
    //   roles: ["admin", "user"],
    // },
  ];

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col justify-between bg-white shadow-xl p-4 px-2 h-full rounded-e-[50px]">
      <div className="w-full">
        {menuItems
          .filter((item) => item.roles.includes(role)) // Filter items based on role
          .map((item) => (
            <div
              key={item.path}
              className={`my-2 flex w-full gap-[10px] items-center group ${
                location.pathname === item.path ? "bg-[#edecec]" : ""
              } hover:bg-[#edecec] rounded-xl py-2 px-2 cursor-pointer`}
              onClick={() =>
                item.label === "Logout"
                  ? handleLogout()
                  : navigate(`${item.path}`)
              }
            >
              <div
                className={`flex items-center justify-center p-2 ${
                  location.pathname === item.path
                    ? "bg-[#3345ea]"
                    : "bg-gray-200"
                } group-hover:bg-[#3345ea] rounded-lg`}
              >
                <item.icon
                  className={`text-xl ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-violet-900"
                  } group-hover:text-white`}
                />
              </div>
              <p>{item.label}</p>
            </div>
          ))}
      </div>
     
    </div>
  );
};

export default Sidebar;
