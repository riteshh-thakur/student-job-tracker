import Navbar from "@/components/navbar";
import Dashboard from "@/views/dashboard/dashboard";
import Sidebar from "@/components/sidebar";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/authSlice";
import Profile from "@/views/dashboard/profile";
import AttendantList from "@/views/dashboard/attendantList";
import EventList from "@/views/dashboard/eventList";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (accessToken && userData) {
      dispatch(login(JSON.parse(userData)));
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="w-full flex gap-[30px]  h-[99vh] overflow-hidden pt-[70px]">
        <div className="w-[300px] ">
          <Sidebar role={user?.role} />
        </div>
        <div
          className="w-full h-full overflow-y-scroll "
          style={{ scrollbarWidth: "none" }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendant-list" element={<AttendantList />} />
            <Route path="/event-list" element={<EventList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
