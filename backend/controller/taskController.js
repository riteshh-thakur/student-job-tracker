const Task = require("../models/taskModel");
const Event = require("../models/eventModel");

const createTask = async (req, res) => {
  try {
    const { name, deadline, assignedAttendee, eventId , description} = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create a new task
    const task = new Task({
      name,
      deadline,
      assignedAttendee,
      event: eventId,
      description,
    });

    // Save task and add it to the event
    const savedTask = await task.save();
    event.tasks = [...(event.tasks || []), savedTask._id];
    await event.save();

    res.status(201).json({
      success: true,
      message:"successfully created task",
      data: savedTask,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasksByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find tasks related to the event
    const tasks = await Task.find({ event: eventId }).populate(
      "assignedAttendee"
    );
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllTask=async(req,res)=>{
  try{
    const tasks=await Task.find().populate("assignedAttendee").populate("event");
    if(!tasks){
      return res.status(404).json({message:"No task found"})
    }
    res.status(200).json({
      success:true,
      message:"successfully retrieved all tasks",
      data:tasks
    });
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
}
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    console.log(status)
    // Validate status value
    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the task's status
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasksByEvent,
  updateTaskStatus,
  getAllTask
};
