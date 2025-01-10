const express = require("express");
const {
  Login,
  Register,
  ViewAllUser,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");
const { createTask, getTasksByEvent, updateTaskStatus } = require("../controller/taskController");

const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.get("/view-all-user", verifyToken, ViewAllUser);

//event routes
Router.post("/events", verifyToken, createEvent);
Router.get("/events", verifyToken, getAllEvents);
Router.put("/events/:id", verifyToken, updateEvent);
Router.delete("/events/:id", verifyToken, deleteEvent);

//task routes
// Create a new task
Router.post("/task", createTask);

// Get tasks by event ID
Router.get("/task/event/:eventId", getTasksByEvent);

// Update task status
Router.put("/task/:taskId", updateTaskStatus);
module.exports = Router;
