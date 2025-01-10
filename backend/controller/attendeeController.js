const Attendee = require("../models/userModel.js");
const Event = require("../models/eventModel.js");
const httpStatusCode = require("../constants/httpStatusCode.js");

const addAttendee = async (req, res) => {
  try {
    const { name, email, phone,event} = req.body;

    // Validate required fields
    if (!name || !email || !phone ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new attendee
    const attendee = new Attendee({
      username:name,
      email,
      phone,
    });

    const savedAttendee = await attendee.save();
    res.status(201).json(savedAttendee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    if (!attendees) {
        console.log("attendee:",attendees);
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "No attendees found",
      });
    }
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Attendees found successfully",
      data: attendees,
    });
  } catch (err) {
    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      error: err.message,
    });
  }
};

const deleteAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.params;

    // Remove attendee from all associated events
    await Event.updateMany(
      { attendees: attendeeId },
      { $pull: { attendees: attendeeId } }
    );

    // Delete the attendee
    const deletedAttendee = await Attendee.findByIdAndDelete(attendeeId);
    if (!deletedAttendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.status(200).json({ message: "Attendee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignAttendeeToEvent = async (req, res) => {
  try {
    const { attendeeId, eventId } = req.body;

    // Check if attendee and event exist
    const attendee = await Attendee.findById(attendeeId);
    const event = await Event.findById(eventId);

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add attendee to the event
    if (!event.attendees.includes(attendeeId)) {
      event.attendees.push(attendeeId);
      await event.save();
    }

    res
      .status(200)
      .json({ message: "Attendee assigned to event successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAttendee,
  getAllAttendees,
  deleteAttendee,
  assignAttendeeToEvent,
};
