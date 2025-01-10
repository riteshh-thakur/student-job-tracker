import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    orderId: "#121269",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Pending",
  },
  {
    id: 2,
    orderId: "#121234",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Cancelled",
  },
  {
    id: 3,
    orderId: "#1212369",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Completed",
  },
  {
    id: 4,
    orderId: "#121269",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Pending",
  },
  {
    id: 5,
    orderId: "#121234",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Cancelled",
  },
  {
    id: 6,
    orderId: "#1212369",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Completed",
  },
  {
    id: 7,
    orderId: "#121269",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Pending",
  },
  {
    id: 8,
    orderId: "#121234",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Cancelled",
  },
  {
    id: 9,
    orderId: "#1212369",
    date: "23 Jan 2019, 10:45pm",
    amount: "₹ 2000",
    status: "Completed",
  },
];

const StatusBadge = ({ status }) => {
  const statusClasses = {
    Pending: "text-yellow-800 bg-[#ffd08978]",
    Completed: "text-green-900 bg-green-100",
    Cancelled: "text-red-900 bg-red-100",
  };

  return (
    <div
      className={`flex items-center justify-center py-2 px-4 w-[130px] rounded-full ${
        statusClasses[status] || ""
      }`}
    >
      {status}
    </div>
  );
};

const ActionButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center py-3">
      <div
        onClick={() => navigate("/dashboard/billing")}
        className="cursor-pointer p-3 bg-[#dce4f9] text-[#2563eb] rounded-full"
      >
        <FiEye size={18} />
      </div>
      <div
        onClick={() => navigate("/dashboard/billing")}
        className="cursor-pointer p-3 bg-[#e3f4e9] text-[#16a34a] rounded-full"
      >
        <FaRegEdit size={18} />
      </div>
      <div className="cursor-pointer p-3 bg-[#fde4ea] text-[#dc2626] rounded-full">
        <Trash2 size={18} />
      </div>
    </div>
  );
};

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="flex gap-2 items-center">
    <input
      id="search"
      type="text"
      placeholder="Filter by Order ID"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="p-2 border rounded-lg focus:outline-none focus:border-blue-800"
    />
  </div>
);

const convertArrayToCSV = (array) => {
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  let csv = keys.join(columnDelimiter) + lineDelimiter;
  array.forEach((item) => {
    csv += keys.map((key) => item[key]).join(columnDelimiter) + lineDelimiter;
  });

  return csv;
};

const downloadCSV = (array) => {
  const csv = convertArrayToCSV(array);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "export.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Transactions = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter((item) =>
    item.orderId.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const subHeaderComponent = useMemo(
    () => (
      <div className="flex justify-between w-full mb-5">
        <button
          onClick={() => downloadCSV(data)}
          className="text-base flex items-center px-6 py-2 gap-[5px] border border-blue-600 text-gray-600 rounded-lg"
        >
          <Upload className="text-gray-600 " size={20} />
          <p>Export</p>
        </button>
        <div className="flex gap-[10px]">
          <FilterComponent
            filterText={filterText}
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
          />
          <button
            onClick={() => navigate("/dashboard/billing")}
            className="bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800"
          >
            + Add Payment
          </button>
        </div>
      </div>
    ),
    [filterText, resetPaginationToggle]
  );

  const columns = [
    {
      name: "Order ID",
      sortable: true,
      selector: (row) => row.orderId,
    },
    {
      name: "Date",
      sortable: true,
      selector: (row) => row.date,
    },
    {
      name: "Amount",
      sortable: true,
      selector: (row) => row.amount,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      name: "Action",
      cell: () => <ActionButtons />,
    },
  ];

  const exportActions = useMemo(
    () => (
      <button
        onClick={() => downloadCSV(data)}
        className="text-base flex items-center px-6 py-2 gap-[5px] border border-blue-600 text-gray-600 rounded-lg"
      >
        <Upload className="text-gray-600 " size={20} />
        <p>Export</p>
      </button>
    ),
    []
  );

  return (
    <div className="mt-8">
      <div className="border rounded-2xl overflow-hidden shadow-sm p-3">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          selectableRows
          dense
          // actions={exportActions}
          subHeader
          subHeaderComponent={subHeaderComponent}
          paginationResetDefaultPage={resetPaginationToggle}
        />
      </div>
    </div>
  );
};

export default Transactions;
