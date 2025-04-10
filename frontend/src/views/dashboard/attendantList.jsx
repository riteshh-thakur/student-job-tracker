import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Mail, Phone, Trash2, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import axios from "axios";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AddAttendee from "@/components/addAttendee";
import { ColorRing } from "react-loader-spinner";
import { Badge } from "@/components/ui/badge";
import { Usertag } from "@/components/tags";

const getBadgeColor = (username) => {
  if (!username) return "gray"; // Default color for missing usernames

  const firstLetter = username.charAt(0).toLowerCase();
  const colors = {
    a: "red",
    b: "blue",
    c: "green",
    d: "yellow",
    e: "purple",
    f: "pink",
    // Add more mappings as needed
    default: "gray",
  };

  return colors[firstLetter] || colors.default;
};

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="md:flex hidden gap-2 items-center">
    <input
      id="search"
      type="text"
      placeholder="Filter by Company name"
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
const AttendantList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [attendants, setAttendants] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
        const filteredItemsData = response?.data?.data?.filter((item) =>
          item?.username?.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredItems(filteredItemsData);
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

  //handle delete attendee
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/attendee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response?.status === 200) {
        setDeleteLoading(false);
        setDeleteId(null);
        setReload(true);
        handleGetAttendantList();
        toast.success("Attendee deleted successfully");
      }
    } catch (error) {
      console.error("error while deleting the attendant:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete attendant"
      );
    }
  };
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };
  const subHeaderComponent = useMemo(
    () => (
      <div className="flex justify-between w-full mb-5">
        <FilterComponent
          filterText={filterText}
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
        />

        <div className="flex gap-[10px]">
          <button
            onClick={() => downloadCSV(attendants)}
            className="text-base flex items-center px-6 py-2 gap-[5px] border border-blue-600 text-gray-600 rounded-lg"
          >
            <Upload className="text-gray-600 " size={20} />
            <p>Export</p>
          </button>
          <Dialog
            open={openModal}
            onOpenChange={setOpenModal}
            className="h-[650px] overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <DialogTrigger asChild>
              <button className=" h-full bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800">
                + Add
              </button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white shadow-lg rounded-lg max-w-md">
              <AddAttendee
                reload={reload}
                setReload={setReload}
                openModal={openModal}
                setOpenModal={setOpenModal}
                data={rowData}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    ),
    [filterText, resetPaginationToggle, openModal]
  );
  const ActionButtons = ({ data }) => {
    const navigate = useNavigate();
    return (
      <div className="flex gap-2 items-center py-3">
        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition">
              <FiEye size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="p-8 bg-white shadow-xl rounded-lg max-w-lg mx-auto space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                User Information
              </h3>
              <div className="w-full border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <User className="text-blue-500" size={20} />
                  <div className="flex-1 ml-4">
                    <span className="font-medium text-gray-700">Name:</span>
                    <div className="font-semibold text-gray-900">
                      {data?.username}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <Mail className="text-blue-500" size={20} />
                  <div className="flex-1 ml-4">
                    <span className="font-medium text-gray-700">Email:</span>
                    <div className="font-semibold text-gray-900">
                      {data?.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <Phone className="text-blue-500" size={20} />
                  <div className="flex-1 ml-4">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <div className="font-semibold text-gray-900">
                      {data?.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Button */}
        <div
          onClick={() => {
            setOpenModal(!openModal);
            setRowData(data);
          }}
          className="cursor-pointer p-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
        >
          <FaRegEdit size={20} />
        </div>

        {/* Delete Button */}
        {deleteLoading && deleteId === data?._id ? (
          <button>
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#16a34a", "#22c55e", "#16a34a", "#22c55e", "#16a34a"]}
            />
          </button>
        ) : (
          <div
            onClick={() => {
              setDeleteId(data?._id);
              handleDelete(data?._id);
            }}
            className="cursor-pointer p-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            <Trash2 size={20} />
          </div>
        )}
      </div>
    );
  };
  const columns = [
    {
      name: "Company Name",
      sortable: true,
      selector: (row) => row.username,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Usertag name={row?.username} />
        </div>
      ),
    },
    {
      name: "Role",
      sortable: true,
      selector: (row) => row?.email,
      cell: (row) => (
        <p className="text-blue-500 underline">
          {row?.email || <span className="text-gray-400 italic">No Email</span>}
        </p>
      ),
    },
    {
      name: "Date of Application",
      sortable: true,
      selector: (row) => row?.phone,
      cell: (row) => (
        <p className="text-gray-700">
          {row?.phone || <span className="text-gray-400 italic">No Date</span>}
        </p>
      ),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row?.phone,
      cell: (row) => (
        <p className="text-gray-700">
          {row?.phone || <span className="text-gray-400 italic">No Status</span>}
        </p>
      ),
    },
    {
      name: "Active/Inactive",
      sortable: true,
      selector: (row) => row?.available,
      cell: (row) => {
        const [checked, setChecked] = useState(row?.available);
        const handleChecked = () => setChecked(!checked);

        return (
          <Switch
            checked={checked}
            onChange={handleChecked}
            className={`${
              checked ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition`}
            />
          </Switch>
        );
      },
    },
    {
      name: "Action",
      cell: (row) => <ActionButtons data={row} />,
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

  useEffect(() => {
    handleGetAttendantList();
  }, [reload]);
  return (
    <div className="w-full px-4 pb-8 ">
      <div className="bg-white w-full p-3 rounded-2xl shadow-xl">
        <div className="border rounded-2xl overflow-hidden shadow-sm p-3">
          {loading ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendantList;
