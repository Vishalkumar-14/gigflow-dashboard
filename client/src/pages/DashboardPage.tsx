import { useEffect, useState } from "react";

import {
  createLead,
  getLeads,
  getLeadStats,
} from "../api/leads";

import LeadsTable from "../components/LeadsTable";
import LeadsChart from "../components/LeadsChart";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const DashboardPage = () => {
  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [stats, setStats] =
    useState({
      totalLeads: 0,
      qualifiedLeads: 0,
      lostLeads: 0,
    });

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      company: "",
      status: "new",
    });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const leadsData =
          await getLeads(token);

        const statsData =
          await getLeadStats(token);

        setLeads(leadsData);
        setStats(statsData);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      await createLead(
        formData,
        token
      );

      setFormData({
        name: "",
        email: "",
        company: "",
        status: "new",
      });

      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10">
        Smart Leads Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-gray-400 text-2xl">
            Total Leads
          </h2>

          <p className="text-7xl font-bold mt-6">
            {stats.totalLeads}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-gray-400 text-2xl">
            Qualified
          </h2>

          <p className="text-7xl font-bold mt-6 text-green-400">
            {stats.qualifiedLeads}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-gray-400 text-2xl">
            Lost Leads
          </h2>

          <p className="text-7xl font-bold mt-6 text-red-400">
            {stats.lostLeads}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-3xl mt-10"
      >
        <h2 className="text-4xl font-bold mb-8">
          Create New Lead
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-800 p-5 rounded-2xl outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Lead Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-slate-800 p-5 rounded-2xl outline-none"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="bg-slate-800 p-5 rounded-2xl outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 p-5 rounded-2xl outline-none"
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
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all w-full py-5 rounded-2xl mt-6 text-2xl font-semibold"
        >
          Create Lead
        </button>
      </form>

      <LeadsTable leads={leads} />

      <LeadsChart
        qualified={stats.qualifiedLeads}
        lost={stats.lostLeads}
        newLeads={
          stats.totalLeads -
          stats.qualifiedLeads -
          stats.lostLeads
        }
      />
    </div>
  );
};

export default DashboardPage;