// import axiosInstance from "./axiosInstance";

// // Create a new task
// export const createTask = async (taskData) => {
//   try {
//     const response = await axiosInstance.post(`/task`, taskData);
//     return response;
//   } catch (error) {
//     console.error("Error creating task:", error);
//     throw error.response?.data || error.message;
//   }
// };

// // Get tasks by event ID
// export const getTasksByEvent = async (eventId) => {
//   try {
//     const response = await axiosInstance.get(`/task/event/${eventId}`);
//     return response;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error.response?.data || error.message;
//   }
// };
// // Get All Task
// export const getAllTasks = async () => {
//   try {
//     const response = await axiosInstance.get(`/task`);
//     return response;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error.response?.data || error.message;
//   }
// };

// // Update task status
// export const updateTaskStatus = async (taskId, status) => {
//   try {
//     const response = await axiosInstance.put(`/task/${taskId}`, { status });
//     return response;
//   } catch (error) {
//     console.error("Error updating task status:", error);
//     throw error.response?.data || error.message;
//   }
// };

// const taskService = {
//   createTask,
//   getTasksByEvent,
//   updateTaskStatus,
//   getAllTasks,
// };
// export default taskService;



import axiosInstance from "./axiosInstance";

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(`/task`, taskData);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error.response?.data || error.message;
  }
};

// Get tasks by event ID
export const getTasksByEvent = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/task/event/${eventId}`);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || error.message;
  }
};

// Get All Tasks
export const getAllTasks = async () => {
  try {
    const response = await axiosInstance.get(`/task`);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || error.message;
  }
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axiosInstance.put(`/task/${taskId}`, { status });
    return response;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error.response?.data || error.message;
  }
};

// Get Applied Jobs
export const getAppliedJobs = async () => {
  try {
    const response = await axiosInstance.get(`/applied-jobs`);
    return response;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw error.response?.data || error.message;
  }
};

// Delete an Applied Job
export const deleteAppliedJob = async (jobId) => {
  try {
    const response = await axiosInstance.delete(`/applied-jobs/${jobId}`);
    return response;
  } catch (error) {
    console.error("Error deleting applied job:", error);
    throw error.response?.data || error.message;
  }
};

// Final export object
const taskService = {
  createTask,
  getTasksByEvent,
  updateTaskStatus,
  getAllTasks,
  getAppliedJobs,
  deleteAppliedJob,
};

export default taskService;
