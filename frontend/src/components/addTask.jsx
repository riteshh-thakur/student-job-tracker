import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import MultiSelect from "./ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import taskService from "@/api/taskService";
const AddTask = ({ data, reload, setReload, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    description: data?.description || "",
    deadline: data?.deadline || "",
    status: data?.status || "",
  });
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch attendees list
  const handleGetAttendeeList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendee`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response?.status === 200) {
        setAttendees(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching attendees list:", error);
      toast.error("Failed to fetch attendees list.");
    }
  };

  //
  //handle get Event list
  const handleGetEventList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 200) {
        setEvents(response?.data?.data || []);

        setLoading(false);
      }
    } catch (error) {
      console.error("error while getting the Event list:", error);
      toast.error(error?.response?.data?.message || "Failed to get Event List");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAttendeeList();
    handleGetEventList();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.deadline) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        assignedAttendee: selectedAttendees,
        eventId:event,
      };
      const response = await taskService.createTask(payload);

      if (response?.status === 201) {
        toast.success("Event created successfully!");
        setFormData({
          name: "",
          description: "",
          deadline: "",
          status: "",
        });
        setSelectedAttendees([]);
        setReload(!reload);
        setOpenModal(!openModal);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error?.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, deadline: selectedDate });
  };
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Add Task</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Task Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Task name"
          />
        </div>

        {/* Task Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Task description"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Due Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !formData?.deadline && "text-muted-foreground"
                )}
              >
                {formData?.deadline ? (
                  format(formData?.deadline, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData?.deadline}
                onSelect={handleDateChange}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* status */}
        <div className="w-full">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <Select
            className="w-full"
            onValueChange={(value) => {
              setFormData({ ...formData, status: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Event */}
        <div className="w-full">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Event
          </label>
          <Select className="w-full" onValueChange={(value) => setEvent(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {Array.isArray(events) &&
                events?.length > 0 &&
                events?.map((item) => {
                  return (
                    <SelectItem value={item?._id}>{item?.name}</SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        {/* Attendees */}
        <div>
          <label
            htmlFor="attendees"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Attendees
          </label>
          <MultiSelect
            className="border"
            value={selectedAttendees}
            options={attendees.map((attendee) => ({
              label: attendee.username,
              value: attendee._id,
            }))}
            onValueChange={setSelectedAttendees}
          />
        </div>

        {/* Submit Button */}
        {loading ? (
          <button
            disabled
            className="flex justify-center mt-2 px-4 py-2 bg-blue-800 text-white rounded-xl cursor-not-allowed"
          >
            <ColorRing
              visible
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </button>
        ) : (
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-700"
          >
            Add Task
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTask;
