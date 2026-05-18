import { useState } from "react";

import API from "../api/axios";

const CreateLeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Created Successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Create New Lead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Lead Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-800 p-3 rounded-lg outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Lead Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-800 p-3 rounded-lg outline-none"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="bg-slate-800 p-3 rounded-lg outline-none"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="bg-slate-800 p-3 rounded-lg outline-none"
        >
          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="lost">
            Lost
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg col-span-2"
        >
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default CreateLeadForm;