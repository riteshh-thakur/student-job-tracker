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
  getAllTask,
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
Router.delete("/attendee/:attendeeId", verifyToken, deleteAttendee);
// /;

//event routes
Router.post("/events", createEvent);
Router.get("/events", getAllEvents);
Router.put("/events/:id", updateEvent);
Router.delete("/events/:id",  deleteEvent);

//task routes
//Create a new task
Router.post("/task", verifyToken, createTask);
//get all task
Router.get("/task",verifyToken,getAllTask);
// Get tasks by event ID
Router.get("/task/event/:eventId", verifyToken, getTasksByEvent);

// Update task status
Router.put("/task/:taskId", verifyToken, updateTaskStatus);
module.exports = Router;
