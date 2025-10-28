import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  total: number;               
};

export function ConnectionsChart({ total }: Props) {
  
  const synthesized = [
    Math.round(total * 0.2),
    Math.round(total * 0.4),
    Math.round(total * 0.7),
    Math.round(total),
  ];

  
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={synthesized} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            tickFormatter={(v) => Math.round(v)} 
          />
          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.05)" }}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              color: "#e2e8f0",
              borderRadius: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(value: number) => [Math.round(value), "Connections"]} // integer tooltip
          />
          <Bar
            dataKey="value"
            fill="#f43f5e"
            radius={[10, 10, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
