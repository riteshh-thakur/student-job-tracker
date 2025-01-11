const httpStatusCode = require("../constants/httpStatusCode");
const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    if (!event) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid event data",
      });
    }
    const savedEvent = await event.save();

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Event created successfully",
      data: savedEvent,
    });
  } catch (err) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong in create event",
      error: err?.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    if (!events) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "No events found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (err) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong in get All event",
      error: err?.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (err) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong in update event",
      error: err?.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Event not found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong in delete event",
      error: err?.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
