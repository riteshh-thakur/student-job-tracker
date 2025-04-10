


import React, { useEffect, useState } from "react";
import dashboardImg from "@/assets/images/dashboard-img.png";
import { useSelector } from "react-redux";
import {
  FaChevronRight,
  FaUsers,
  FaBox,
} from "react-icons/fa";
import { TbSortDescending2 } from "react-icons/tb";
import { CiRepeat } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";


const Card = ({ icon: Icon, title, value, bgColor, borderColor, onClick }) => (
  <div className="rounded-2xl bg-white shadow-lg p-4 border md:w-3/12 w-full">
    <div className="flex gap-[30px]">
      <div className={`rounded-full h-min border ${borderColor} p-1`}>
        <div className={`p-3 ${bgColor} text-white rounded-full h-min`}>
          <Icon className="text-3xl" />
        </div>
      </div>
      <div>
        <p className="text-xl font-medium">{title}</p>
        <h1 className="text-3xl font-semibold">{value}</h1>
      </div>
    </div>
    {onClick && (
      <p
        className="cursor-pointer text-green-700 font-medium text-sm mt-4"
        onClick={onClick}
      >
        Show Details
      </p>
    )}
  </div>
);

const TableRow = ({ data }) => (
  <div className="flex w-full gap-[10px] my-3">
    {data.map((item, index) => (
      <div
        key={index}
        className={`overflow-scroll ${item.width}`}
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className={`flex items-center ${item?.center && "justify-center"}`}
        >
          {item.icon && <item.icon className="text-gray-600" />}
          <p className={`text-base font-medium ${item.textColor || ""}`}>
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const TableRowEvents = ({ data }) => (
  <div className="flex w-full gap-[10px] my-5">
    {data.map((item, index) => (
      <div
        key={index}
        className={`overflow-scroll ${item.width}`}
        style={{ scrollbarWidth: "none" }}
      >
        <div
          className={`flex items-center ${item?.center && "justify-center"} ${
            item?.status === "Pending"
              ? "text-yellow-800 bg-[#ffd08978] py-1"
              : item?.status === "Delivered"
              ? "text-green-900 bg-green-100 py-1"
              : item?.status === "Cancelled"
              ? "text-red-900 bg-red-100 py-1"
              : ""
          } rounded-md`}
        >
          {item.icon && <item.icon className="text-gray-600" />}
          <p
            className={`text-base font-medium ${item.textColor || ""} ${
              item.status && "text-sm"
            }`}
          >
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [attendants, setAttendants] = useState([]);
  const [events, setEvents] = useState([]);

 
   

  const cardData = [
    // {
    //   icon: FaUsers,
    //   title: "Registered Companies ",
    //   value: "",
    //   bgColor: "bg-blue-800",
    //   borderColor: "border-blue-800",
    //   onClick: () => {
    //     navigate("/dashboard/attendant-list");
    //   },
    // },
    {
      icon: FaBox,
      title: "Total Job List",
      value: "",
      bgColor: "bg-[#1fb53f]",
      borderColor: "border-[#1fb53f]",
      onClick: () => {
        navigate("/dashboard/event-list");
      },
    },
  ];




  //handle get attendee list
  const handleGetAttendantList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendee`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 200) {
        setAttendants(response?.data?.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("error while getting the attendant list:", error);
      toast.error(
        error?.response?.data?.message || "Failed to get attendant List"
      );
    } finally {
      setLoading(false);
    }
  };

  //handle get Event list
  const handleGetEventList = async () => {
    setEventLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 200) {
        setEvents(response?.data?.data || []);
        setEventLoading(false);
      }
    } catch (error) {
      console.error("error while getting the Event list:", error);
      toast.error(error?.response?.data?.message || "Failed to get Event List");
    } finally {
      setEventLoading(false);
    }
  };
  const tableHeaders = [
    { value: "Name", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Role", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Status", width: "w-2/12", icon: TbSortDescending2 },
    { value: "Location", width: "w-2/12", icon: TbSortDescending2 },
  ];

  const tableHeadersEvents = [
    { value: "Name", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Role", width: "w-3/12", icon: TbSortDescending2 },
    { value: "Status", width: "w-3/12", icon: TbSortDescending2 },
    { value: "Location", width: "w-2/12", icon: TbSortDescending2 },
  ];

  useEffect(() => {
    handleGetAttendantList();
    handleGetEventList();
  }, []);
  return (
    <div className="w-full flex flex-col items-center md:px-4 px-2 pb-8">
      {/* Header Section */}
      <div className="border relative rounded-3xl shadow-sm bg-white w-full p-5 flex justify-between items-center mb-4 md:mt-[60px] md:h-[200px]">
        <div>
          <h1 className="text-2xl font-semibold text-[#616161]">
            Good Morning,{" "}
            <span className="text-[#212181]">{user?.username || "John"}</span>
          </h1>
          <p className="text-[#616161]">Have a nice day at work</p>
        </div>
        <img
          src={dashboardImg}
          alt="Dashboard"
          className="h-[300px] absolute right-[100px] top-[-100px] md:flex hidden"
        />
      </div>

      {/* Cards Section */}
      <div className="flex md:flex-row flex-col w-full gap-[20px] md:my-5">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full flex md:flex-row flex-col gap-[20px] my-5">
        <div className="md:w-6/12 w-full rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-semibold">
              Job Registration Company list
            </p>
            <div className="flex gap-[5px] items-center cursor-pointer group">
              <p
                className="text-blue-800 group-hover:text-blue-gray-900"
                onClick={() => navigate("/dashboard/attendant-list")}
              >
                See All
              </p>
              <FaChevronRight className="text-sm text-blue-800 group-hover:text-gray-900" />
            </div>
          </div>
          {/* Table Headers */}
          {/* <TableRow
            data={tableHeaders.map((header) => ({
              value: header.value,
              width: header.width,
              icon: header.icon,
              textColor: "text-gray-600",
            }))}
          />
          {loading && (
            <div className="w-full flex justify-center items-center h-[400px]">
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#000", "#000", "#000", "#000", "#000"]}
              />
            </div>
          )} */}
          {/* Table Rows */}
          {/* {!loading &&
            Array.isArray(attendants) &&
            attendants.length > 0 &&
            attendants.map((row, index) => (
              <TableRow
                key={index}
                data={[
                  { value: row?.username, center: false, width: "w-4/12" },
                  { value: row?.email, center: false, width: "w-4/12" },
                  { value: row?.phone, center: false, width: "w-2/12" },
                  {
                    value: (
                      <div className="cursor-pointer hover:bg-blue-800 hover:text-white flex items-center bg-gray-200 rounded-lg p-2 w-min">
                        <CiRepeat className="text-lg" />
                      </div>
                    ),
                    center: true,
                    width: "w-2/12",
                  },
                ]}
              />
            ))}
          {Array.isArray(attendants) && attendants?.length == 0 && (
            <p>There is no Users</p>
          )}
        </div>
        <div className="md:w-6/12 w-full rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-semibold">Job List</p>
            <div className="flex gap-[5px] items-center cursor-pointer group">
              <p
                className="text-blue-800 group-hover:text-blue-gray-900"
                onClick={() => navigate("/dashboard/event-list")}
              >
                See All
              </p>
              <FaChevronRight className="text-sm text-blue-800 group-hover:text-gray-900" />
            </div>
          </div> */}
          {/* Table Headers */}
          <TableRowEvents
            data={tableHeadersEvents.map((header) => ({
              value: header.value,
              width: header.width,
              icon: header.icon,
              textColor: "text-gray-600",
            }))}
          />
          {eventLoading && (
            <div className="w-full flex justify-center items-center h-[400px]">
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#000", "#000", "#000", "#000", "#000"]}
              />
            </div>
          )}
          {/* Table Rows */}
          {!eventLoading &&
            Array.isArray(events) &&
            events.length > 0 &&
            events.map((row, index) => (
              <TableRowEvents
                key={index}
                data={[
                  { value: row?.name, center: false, width: "w-4/12" },
                  { value: row?.role, center: false, width: "w-3/12" },
                  {
                    value: row?.status,
                    center: false,
                    width: "w-3/12",
                  },
                  {
                    value: row?.location,
                    center: false,
                    width: "w-3/12",
                  },
                  // {
                  //   value: "Pending",
                  //   center: true,
                  //   width: "w-2/12",
                  //   status: "Pending",
                  // },
                ]}
              />
            ))}
          {Array.isArray(events) && events?.length == 0 && (
            <p>There is no Events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

