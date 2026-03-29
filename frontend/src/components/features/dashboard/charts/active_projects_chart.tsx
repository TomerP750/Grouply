import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  { name: "Mon", active: 3, completed: 1 },
  { name: "Tue", active: 4, completed: 1 },
  { name: "Wed", active: 6, completed: 3 },
  { name: "Thu", active: 5, completed: 2 },
  { name: "Fri", active: 7, completed: 4 },
  { name: "Sat", active: 6, completed: 5 },
  { name: "Sun", active: 8, completed: 6 },
];

interface ActiveProjectsChartProps {
  activeProjectsCount: number
}

export function ActiveProjectsChart({ activeProjectsCount }: ActiveProjectsChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              color: "#e2e8f0",
            }}
          />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#14b8a6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
