import React from "react";
import dashboardImg from "@/assets/images/dashboard-img.png";
import { useSelector } from "react-redux";
import {
  FaChevronRight,
  FaUsers,
  FaShoppingCart,
  FaWallet,
  FaBox,
} from "react-icons/fa";
import { TbSortDescending2 } from "react-icons/tb";
import { CiRepeat } from "react-icons/ci";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

// Register the required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement
);

const BarGraph = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [50, 70, 90, 60, 80, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Over the Last 6 Months",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const ReportGraph = () => {
  const data = {
    labels: ["Total Purchase", "Cash Received", "Bank Receive"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
  };
  return (
    <div className="w-8/12">
      <Doughnut data={data} />
    </div>
  );
};
const Card = ({ icon: Icon, title, value, bgColor, borderColor, onClick }) => (
  <div className="rounded-2xl bg-white shadow-lg p-4 border w-3/12">
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
      <div key={index} className={item.width}>
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

const TableRowOrder = ({ data }) => (
  <div className="flex w-full gap-[10px] my-5">
    {data.map((item, index) => (
      <div key={index} className={item.width}>
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

const PharmacyDashboard = () => {
  const { user } = useSelector((state) => state?.auth);

  const cardData = [
    {
      icon: FaUsers,
      title: "Total Customer",
      value: "120",
      bgColor: "bg-blue-800",
      borderColor: "border-blue-800",
      onClick: () => {
        console.log("Customer Details");
      },
    },
    {
      icon: FaShoppingCart,
      title: "Total Sales",
      value: "234",
      bgColor: "bg-[#1fb53f]",
      borderColor: "border-[#1fb53f]",
      onClick: () => {
        console.log("Customer Details");
      },
    },
    {
      icon: FaWallet,
      title: "Total Profit",
      value: "₹ 12,000",
      bgColor: "bg-[#e8d52a]",
      borderColor: "border-[#e8d52a]",
      onClick: () => {
        console.log("Customer Details");
      },
    },
    {
      icon: FaBox,
      title: "Out of Stock",
      value: "56",
      bgColor: "bg-pink-500",
      borderColor: "border-pink-500",
      onClick: () => {
        console.log("Customer Details");
      },
    },
  ];

  const tableHeaders = [
    { value: "Medicine name", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Expire Date", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Quantity", width: "w-2/12", icon: TbSortDescending2 },
    { value: "Return", width: "w-2/12", icon: TbSortDescending2 },
  ];

  const tableData = [
    {
      medicine: "Doxycyline",
      expireDate: "24 Dec 2025",
      quantity: 40,
    },
    {
      medicine: "Amoxicillin",
      expireDate: "10 Jan 2026",
      quantity: 30,
    },
    {
      medicine: "Ciprofloxacin",
      expireDate: "15 Feb 2025",
      quantity: 50,
    },
    {
      medicine: "Ibuprofen",
      expireDate: "20 Mar 2024",
      quantity: 100,
    },
    {
      medicine: "Paracetamol",
      expireDate: "12 Apr 2025",
      quantity: 80,
    },
    {
      medicine: "Metformin",
      expireDate: "30 May 2026",
      quantity: 60,
    },
  ];
  const tableHeadersOrders = [
    { value: "Medicine name", width: "w-4/12", icon: TbSortDescending2 },
    { value: "Batch No", width: "w-3/12", icon: TbSortDescending2 },
    { value: "Quantity", width: "w-2/12", icon: TbSortDescending2 },
    { value: "Status", width: "w-2/12", icon: TbSortDescending2 },
    { value: "Price", width: "w-1/12", icon: TbSortDescending2 },
  ];

  const tableDataOrders = [
    {
      medicine: "Doxycyline",
      batchNo: "24 Dec 2025",
      status: "Pending",
      quantity: 40,
    },
    {
      medicine: "Amoxicillin",
      batchNo: "10 Jan 2026",
      status: "Cancelled",
      quantity: 30,
    },
    {
      medicine: "Ciprofloxacin",
      batchNo: "15 Feb 2025",
      status: "Delivered",
      quantity: 50,
    },
    {
      medicine: "Ibuprofen",
      batchNo: "20 Mar 2024",
      status: "Pending",
      quantity: 100,
    },
    {
      medicine: "Paracetamol",
      batchNo: "12 Apr 2025",
      status: "Pending",
      quantity: 80,
    },
    {
      medicine: "Metformin",
      batchNo: "30 May 2026",
      status: "Pending",
      quantity: 60,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 pb-8">
      {/* Header Section */}
      <div className="border relative rounded-3xl shadow-sm bg-white w-full p-5 flex justify-between items-center mb-4 mt-[60px] h-[200px]">
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
          className="h-[300px] absolute right-[100px] top-[-100px]"
        />
      </div>

      {/* Cards Section */}
      <div className="flex w-full gap-[20px] my-5">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full flex gap-[20px] my-5">
        <div className="w-6/12 rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-semibold">Expiring List</p>
            <div className="flex gap-[5px] items-center cursor-pointer group">
              <p className="text-blue-800 group-hover:text-blue-gray-900">
                See All
              </p>
              <FaChevronRight className="text-sm text-blue-800 group-hover:text-gray-900" />
            </div>
          </div>
          {/* Table Headers */}
          <TableRow
            data={tableHeaders.map((header) => ({
              value: header.value,
              width: header.width,
              icon: header.icon,
              textColor: "text-gray-600",
            }))}
          />

          {/* Table Rows */}
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              data={[
                { value: row.medicine, center: false, width: "w-4/12" },
                { value: row.expireDate, center: false, width: "w-4/12" },
                { value: row.quantity, center: false, width: "w-2/12" },
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
        </div>
        <div className="w-6/12 rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-semibold">Recent Order's</p>
            <div className="flex gap-[5px] items-center cursor-pointer group">
              <p className="text-blue-800 group-hover:text-blue-gray-900">
                See All
              </p>
              <FaChevronRight className="text-sm text-blue-800 group-hover:text-gray-900" />
            </div>
          </div>
          {/* Table Headers */}
          <TableRowOrder
            data={tableHeadersOrders.map((header) => ({
              value: header.value,
              width: header.width,
              icon: header.icon,
              textColor: "text-gray-600",
            }))}
          />

          {/* Table Rows */}
          {tableDataOrders.map((row, index) => (
            <TableRowOrder
              key={index}
              data={[
                { value: row.medicine, center: false, width: "w-4/12" },
                { value: row.batchNo, center: false, width: "w-3/12" },
                { value: row.quantity, center: false, width: "w-2/12" },

                {
                  value: row.status,
                  center: true,
                  width: "w-2/12",
                  status: row.status,
                },
                { value: row.quantity, center: false, width: "w-1/12" },
              ]}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-row gap-[20px] my-4">
        <div className="w-7/12 rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Monthly Progress</h2>
          <BarGraph />
        </div>
        <div className="w-5/12 rounded-2xl border shadow-lg p-4 pt-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Today's Report</h2>
          <div className="w-full flex flex-col items-center justify-center mt-1">
            <p className="text-gray-600">Total Earning</p>
            <p className="text-3xl font-bold">₹ 1000</p>
            <ReportGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
