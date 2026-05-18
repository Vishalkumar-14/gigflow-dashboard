import {
  deleteLead,
  updateLeadStatus,
} from "../api/leads";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface Props {
  leads: Lead[];
}

const LeadsTable = ({
  leads,
}: Props) => {
  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "qualified":
        return "bg-green-500/20 text-green-400";

      case "lost":
        return "bg-red-500/20 text-red-400";

      case "contacted":
        return "bg-yellow-500/20 text-yellow-400";

      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) return;

      await deleteLead(id, token);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange =
    async (
      id: string,
      status: string
    ) => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        await updateLeadStatus(
          id,
          status,
          token
        );

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="mt-10 bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Leads List
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700 text-left text-gray-400">
            <th className="pb-4">
              Name
            </th>

            <th className="pb-4">
              Email
            </th>

            <th className="pb-4">
              Company
            </th>

            <th className="pb-4">
              Status
            </th>

            <th className="pb-4">
              Update
            </th>

            <th className="pb-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b border-slate-800"
            >
              <td className="py-4">
                {lead.name}
              </td>

              <td className="py-4">
                {lead.email}
              </td>

              <td className="py-4">
                {lead.company}
              </td>

              <td className="py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="py-4">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(
                      lead._id,
                      e.target.value
                    )
                  }
                  className="bg-slate-800 p-2 rounded-lg"
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
              </td>

              <td className="py-4">
                <button
                  onClick={() =>
                    handleDelete(
                      lead._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;