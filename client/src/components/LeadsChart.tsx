import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  qualified: number;
  lost: number;
  newLeads: number;
}

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
];

const LeadsChart = ({
  qualified,
  lost,
  newLeads,
}: Props) => {
  const data = [
    {
      name: "Qualified",
      value: qualified,
    },
    {
      name: "Lost",
      value: lost,
    },
    {
      name: "New",
      value: newLeads,
    },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Leads Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsChart;