import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddAttendee = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError("All fields are required!");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/attendee`,formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 201) {
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("error while getting the attendant list:", error);
      toast.error(
        error?.response?.data?.message || "Failed to get attendant List"
      );
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Attendee</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter attendee name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter attendee email"
          />
        </div>

        {/* phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter phone number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
        >
          Add Attendee
        </button>
      </form>
    </div>
  );
};

export default AddAttendee;
