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
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
const AddEvent = ({ data, reload, setReload, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    description:data?.description||  "",
    location: data?.description|| "",
    date:data?.date||  "",
    time: data?.time|| "",
  });
  const [attendees, setAttendees] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    handleGetAttendeeList();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.date ||
      !formData.time
    ) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          ...formData,
          attendees: selectedAttendees,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 201) {
        toast.success("Event created successfully!");
        setFormData({
          name: "",
          description: "",
          location: "",
          date: "",
          time: "",
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
    setFormData({ ...formData, date: selectedDate });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Event</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Event Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Description */}
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
            placeholder="Enter event description"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter event location"
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !formData.date && "text-muted-foreground"
                )}
              >
                {formData.date ? (
                  format(formData.date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Attendees */}
        <div>
          <label
            htmlFor="attendees"
            className="block text-sm font-medium text-gray-700"
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
            Add Event
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEvent;
