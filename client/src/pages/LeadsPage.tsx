import { useEffect, useState } from "react";

import {
  getLeads,
} from "../api/leads";

import LeadsTable from "../components/LeadsTable";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const LeadsPage = () => {
  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getLeads(token);

        setLeads(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      lead.company
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Leads Management
        </h1>

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-slate-900 px-4 py-3 rounded-xl outline-none w-72"
        />
      </div>

      <LeadsTable
        leads={filteredLeads}
      />
    </div>
  );
};

export default LeadsPage;