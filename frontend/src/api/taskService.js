import axiosInstance from "./axiosInstance";

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/task`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error.response?.data || error.message;
  }
};

// Get tasks by event ID
export const getTasksByEvent = async (eventId) => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/task/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || error.message;
  }
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/task/${taskId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error.response?.data || error.message;
  }
};
