import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@/components/progressBar";
import Spinner from "@/components/spinner";
import toast from "react-hot-toast";

const TaskTracker = () => {
  const dispatch = useDispatch();
  const [tasks,setTasks]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [filter, setFilter] = useState("all");
  const handleFetchTasks=async()=>{
    try{

    }catch(error){
      console.error(error);
      toast.error(error?.response?.data?.message || "Error fetching tasks");
    }
  }
  useEffect(() => {
     handleFetchTasks();
  }, []);

  const handleStatusChange = (taskId, status) => {
    dispatch(updateTaskStatus({ taskId, status }));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const progress = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>

      <ProgressBar progress={progress} />

      <div className="flex justify-between items-center my-4">
        <select
          className="p-2 border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-md shadow ${
                task.status === "completed" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <h2 className="font-semibold text-lg">{task.name}</h2>
              <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
              <p className="text-sm text-gray-600">
                Assigned to: {task.assignedTo || "Unassigned"}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <button
                  className={`px-4 py-1 rounded text-white ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                  onClick={() =>
                    handleStatusChange(
                      task.id,
                      task.status === "completed" ? "pending" : "completed"
                    )
                  }
                >
                  {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                </button>
                <button className="text-red-500 font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskTracker;
