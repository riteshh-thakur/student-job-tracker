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
const {
  createTask,
  getTasksByEvent,
  updateTaskStatus,
} = require("../controller/taskController");
const {
  getAllAttendees,
  addAttendee,
  deleteAttendee,
  assignAttendeeToEvent,
} = require("../controller/attendeeController");

const Router = express.Router();

Router.post("/login", Login);
Router.post("/register", Register);
Router.get("/view-all-user", verifyToken, ViewAllUser);

//attendees route
Router.get("/attendee", verifyToken, getAllAttendees);
Router.post("/attendee", verifyToken, addAttendee);
Router.delete("/attendee", verifyToken, deleteAttendee);
Router.post("/attendee/assignEvent", verifyToken, assignAttendeeToEvent);

//event routes
Router.post("/events", verifyToken, createEvent);
Router.get("/events", verifyToken, getAllEvents);
Router.put("/events/:id", verifyToken, updateEvent);
Router.delete("/events/:id", verifyToken, deleteEvent);

//task routes
// Create a new task
Router.post("/task", verifyToken, createTask);

// Get tasks by event ID
Router.get("/task/event/:eventId", verifyToken, getTasksByEvent);

// Update task status
Router.put("/task/:taskId", verifyToken, updateTaskStatus);
module.exports = Router;
