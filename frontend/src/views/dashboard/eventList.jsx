import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiCalendar, FiClock, FiEye, FiInfo, FiWatch } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRegEdit,
} from "react-icons/fa";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import axios from "axios";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ColorRing } from "react-loader-spinner";
import AddEvent from "@/components/addEvent";
import { formatDate, formatDateTime, formatTime } from "@/utils/dateFormater";

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

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="md:flex hidden gap-2 items-center">
    <input
      id="search"
      type="text"
      placeholder="Filter by event name"
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
  const [events, setEvents] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //handle get Event list
  const handleGetEventList = async () => {
    setLoading(true);
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
        console.log("events:", response?.data?.data);
        const filteredItemsData = response?.data?.data?.filter((item) =>
          item?.name?.toLowerCase()?.includes(filterText.toLowerCase())
        );
        setFilteredItems(filteredItemsData);
        setLoading(false);
      }
    } catch (error) {
      console.error("error while getting the Event list:", error);
      toast.error(error?.response?.data?.message || "Failed to get Event List");
    } finally {
      setLoading(false);
    }
  };

  //handle delete attendee
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/events/${id}`,
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
        handleGetEventList();
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      console.error("error while deleting the Event:", error);
      toast.error(error?.response?.data?.message || "Failed to delete Event");
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
            onClick={() => downloadCSV(events)}
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
              <AddEvent
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
          <DialogContent className="p-8 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl max-w-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Event Details
              </h2>
              <p className="text-sm text-gray-500">
                View all the information about this event
              </p>
            </div>

            {/* Event Information */}
            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-center">
                <span className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <FiCalendar size={20} />
                </span>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 font-medium">Name</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {data?.name}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-center">
                <span className="p-2 bg-green-100 rounded-full text-green-600">
                  <FiInfo size={20} />
                </span>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Description
                  </p>
                  <p className="text-gray-700">{data?.description}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center">
                <span className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                  <FiClock size={20} />
                </span>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-gray-700">
                    {data?.date && formatDate(data?.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center">
                <span className="p-2 bg-purple-100 rounded-full text-purple-600">
                  <FiWatch size={20} />
                </span>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 font-medium">Time</p>
                  <p className="text-gray-700">{data?.time}</p>
                </div>
              </div>

              {/* Attendees */}
              <div>
                <p className="text-sm text-gray-500 font-medium mb-3">
                  Attendees
                </p>
                <div className="flex flex-wrap gap-3">
                  {data?.attendees?.length > 0 ? (
                    data?.attendees.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full shadow"
                      >
                        <span className="bg-blue-600 text-white font-bold w-6 h-6 flex items-center justify-center rounded-full">
                          {item?.username[0]}
                        </span>
                        <span>{item?.username}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No attendees available.
                    </p>
                  )}
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
      name: "Event Name",
      sortable: true,
      selector: (row) => row.name,
      cell: (row) => (
        <p className="text-blue-600 font-semibold">
          {row?.name || <span className="text-gray-400 italic">No Name</span>}
        </p>
      ),
    },
    {
      name: "Description",
      sortable: true,
      selector: (row) => row?.description,
      cell: (row) => (
        <p className="text-gray-700">
          {row?.description || (
            <span className="text-gray-400 italic">No Description</span>
          )}
        </p>
      ),
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row?.location,
      cell: (row) => (
        <p className="text-green-600 flex items-center gap-2">
          <FaMapMarkerAlt size={14} />
          {row?.location || (
            <span className="text-gray-400 italic">No Location</span>
          )}
        </p>
      ),
    },

    {
      name: "Date",
      sortable: true,
      selector: (row) => row?.date,
      cell: (row) => (
        <p className="text-purple-600 flex items-center gap-2">
          <FaCalendarAlt size={14} />
          {row?.date ? (
            formatDate(row?.date)
          ) : (
            <span className="text-gray-400 italic">No Date</span>
          )}
        </p>
      ),
    },
    {
      name: "Time",
      sortable: true,
      selector: (row) => row?.time,
      cell: (row) => (
        <p className="text-orange-500 flex items-center gap-2">
          <FaClock size={14} />
          {row?.time ? (
            row?.time
          ) : (
            <span className="text-gray-400 italic">No Time</span>
          )}
        </p>
      ),
    },
    // {
    //   name: "Status",
    //   sortable: true,
    //   selector: (row) => row.available,
    //   cell: (row) => {
    //     const [checked, setChecked] = useState(row?.available);
    //     const handleChecked = () => {
    //       setChecked(!checked);
    //     };
    //     return <Switch checked={checked} onCheckedChange={handleChecked} />;
    //   },
    // },
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
    handleGetEventList();
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
