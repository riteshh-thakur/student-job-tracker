// import React, { useEffect, useMemo, useState } from "react";
// import DataTable from "react-data-table-component";
// import { ColorRing } from "react-loader-spinner";
// import { IoBanOutline } from "react-icons/io5";
// import { BsThreeDots } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa";
// import { MdOutlineDocumentScanner } from "react-icons/md";
// import { BsCashCoin } from "react-icons/bs";
// import { FaRegEye } from "react-icons/fa";
// import { TfiEmail } from "react-icons/tfi";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useNavigate } from "react-router-dom";
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { CalendarDays } from 'lucide-react';
// import AddTask from "@/components/addTask";
// import taskService from "@/api/taskService";

// import { formatDateTime, formatDate } from "@/utils/dateFormater";
// import { Tag, Usertag } from "@/components/tags";
// import toast from "react-hot-toast";
// const TaskTracker = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [reload, setReload] = useState(false);
//   const [rowData, setRowData] = useState(null);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const handleGetTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await taskService.getAllTasks();
//       if (response?.status === 200) {
//         setTasks(response?.data?.data);
//       }
//     } catch (error) {
//       console.log("Error to get tasks:", error);
//       toast.error(error?.response?.data?.message || "Failed to  get tasks");
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleGetTasks();
//   }, [reload]);
//   return (
//     <div className="w-full px-4 pb-8 ">
//       <div className="flex  items-center justify-between w-full mt-4">
//         <h1 className="text-xl font-medium">Jobs Lists</h1>
//         <Dialog
//           open={openModal}
//           onOpenChange={setOpenModal}
//           className="h-[650px] overflow-y-scroll"
//           style={{ scrollbarWidth: "none" }}
//         >
//           {/* <DialogTrigger asChild>
//             <button className=" h-full py-2 bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800">
//               + Create Task
//             </button>
//           </DialogTrigger> */}
//           <DialogContent>
//             <AddTask
//               reload={reload}
//               setReload={setReload}
//               openModal={openModal}
//               setOpenModal={setOpenModal}
//               data={rowData}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>
//       <div className=" w-full flex flex-wrap my-2">
//         {loading ? (
//           <div className="w-full flex justify-center items-center h-[400px]">
//             <ColorRing
//               visible={true}
//               height="70"
//               width="70"
//               ariaLabel="color-ring-loading"
//               wrapperStyle={{}}
//               wrapperClass="color-ring-wrapper"
//               colors={["#000", "#000", "#000", "#000", "#000"]}
//             />
//           </div>
//         ) : (
//           Array.isArray(tasks) &&
//           tasks?.length > 0 &&
//           tasks?.map((item) => (
//             <div className="md:w-4/12 w-full p-2">
//               <TaskCard data={item} reload={reload} setReload={setReload} />
//             </div>
//           ))
//         )}

//         <div className="flex"></div>
//       </div>
//     </div>
//   );
// };

// const TaskCard = ({ data, reload, setReload }) => {
//   const navigate = useNavigate();

//   const getInitials = (name) => {
//     const [first, last] = name?.split(" ");
//     return `${first?.[0] || ""}${last?.[0] || ""}`?.toUpperCase();
//   };
//   // Function to generate a random background color
//   const getRandomBgColor = () => {
//     const colors = [
//       "bg-blue-500",
//       "bg-pink-700",
//       "bg-yellow-500",
//       "bg-purple-600",
//       "bg-indigo-700",
//       "bg-teal-800",
//       "bg-orange-800",
//       "bg-gray-800",
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };
//   const statusColor =
//     data?.status === "Pending" ? "bg-green-300" : "bg-red-300";

//   const handleUpdate = async (status) => {
//     try {
//       const response = await taskService.updateTaskStatus(data?._id, status);
//       if (response?.status === 200) {
//         setReload(!reload);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update task");
//     }
//   };
//   return (
//     <div className="w-full bg-white p-5 border rounded-2xl shadow-lg flex flex-col items-center justify-center">
//       <div className="w-full flex justify-between items-center">
//         {data?.status === "Pending" ? (
//           <div
//             className="bg-pink-400 rounded-full p-1 h-max text-white"
//             title="Deactivate user"
//           >
//             <IoBanOutline className="text-xl" />
//           </div>
//         ) : (
//           <div
//             className="bg-green-400 rounded-full p-2 h-max text-white"
//             title="Activate user"
//           >
//             <FaCheck className="text-sm" />
//           </div>
//         )}

//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             {" "}
//             <div
//               className="rounded-full p-2 hover:bg-gray-200 cursor-pointer"
//               title="More options"
//             >
//               <BsThreeDots className="text-xl" />
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="relative right-[20px] rounded-2xl shadow-2xl px-4 py-2">
//             <DropdownMenuItem
//               className="flex items-center gap-[10px] py-2 px-3 rounded-lg cursor-pointer"
//               onClick={() => handleUpdate("Completed")}
//             >
//               <BsCashCoin />
//               <p>Mark as Completed</p>
//             </DropdownMenuItem>

//             <DropdownMenuItem
//               className="flex items-center gap-[10px] py-2 px-3 rounded-lg cursor-pointer"
//               onClick={() => handleUpdate("Pending")}
//             >
//               <FaRegEye />
//               <p>Mark as Pending</p>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div
//         className={`mt-[-20px] relative rounded-full ${getRandomBgColor()} h-[50px] w-[50px] flex items-center justify-center text-white`}
//       >
//         <p className="text-white text-xl">
//           {getInitials(data?.name || "Hibban")}
//         </p>
//       </div>
//       <h1 className="font-medium my-4 mb-2 text-xl">{data?.name}</h1>
//       <p className="text-gray-500 text-sm mb-8">{data?.description}</p>
//       <div className="flex w-full gap-[10px] my-1 items-center">
//         <p className="text-gray-600"> Due Date:</p>
//         <Tag classNames="flex border rounded-lg items-center gap-[10px] px-2 py-2">
//          <CalendarDays className="text-gray-600" />
//           <p>{data?.date && formatDate(data?.date)}</p>
//         </Tag>
//       </div>

//       {/* <div className="flex flex-col w-full justify-between my-1">
//         <p className="text-gray-600">Assignee Attendees:</p>
//         <div className="flex flex-wrap gap-[10px] mt-2 ">
//           {data?.assignedAttendee?.length > 0 &&
//             data?.assignedAttendee?.map((item) => {
//               return <Usertag name={item?.username} />;
//             })}
//           {data?.assignedAttendee?.length === 0 && <p>No participants</p>}
//         </div>
//       </div> */}
//       <div className="flex w-full gap-[10px] my-1 items-center">
//         <p className="text-gray-600">Role:</p>
//         <Usertag name={data?.event?.role} />
//       </div>

//       <button
//         className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white mb-2 mt-8 px-8 py-2 rounded-xl"
//         onClick={() =>
//           navigate("/dashboard/event-list", {
//             state: {
//               data: data,
//             },
//           })
//         }
//       >
//         View Event
//       </button>
//     </div>
//   );
// };

// export default TaskTracker;



import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import taskService from "@/api/taskService";
import { formatDate } from "@/utils/dateFormater";

const JobCard = ({ job, onDelete, loading, deleteId }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200 w-full sm:w-[48%] lg:w-[32%]">
      <h2 className="text-xl font-bold text-blue-800 mb-2">{job?.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{job?.description}</p>

      <div className="text-sm flex items-center gap-2 text-green-600 mb-1">
        <FaMapMarkerAlt size={14} /> {job?.location || "Not Provided"}
      </div>
      <div className="text-sm flex items-center gap-2 text-purple-600 mb-2">
        <FaCalendarAlt size={14} /> {job?.date ? formatDate(job?.date) : "No Date"}
      </div>

      <div className="text-sm text-gray-700 mb-2">
        <strong>Role:</strong> {job?.role || "N/A"}
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <strong>Status:</strong> {job?.status || "Pending"}
      </div>

      <button
        onClick={() => onDelete(job?._id)}
        disabled={loading && deleteId === job?._id}
        className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition w-full"
      >
        {loading && deleteId === job?._id ? (
          <ColorRing
            visible={true}
            height="20"
            width="20"
            colors={["#f87171", "#ef4444", "#f87171", "#ef4444", "#f87171"]}
          />
        ) : (
          <>
            <FiTrash2 size={16} /> Unapply
          </>
        )}
      </button>
    </div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await taskService.getAppliedJobs();
      setJobs(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch applied jobs");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteId(id);
    try {
      const res = await taskService.deleteAppliedJob(id);
      if (res?.status === 200) {
        toast.success("Job removed successfully");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      toast.error("Failed to remove job");
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Applied Jobs</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <ColorRing
            visible={true}
            height="70"
            width="70"
            colors={["#3b82f6", "#60a5fa", "#3b82f6", "#60a5fa", "#3b82f6"]}
          />
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No jobs applied yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-start">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              loading={deleteLoading}
              deleteId={deleteId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
