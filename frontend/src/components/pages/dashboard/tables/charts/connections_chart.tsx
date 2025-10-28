import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

type Props = { total: number };

export function ConnectionsChart({ total }: Props) {

  const raw = [
    { day: "Sun", value: 0 },
    { day: "Mon", value: 3 },
    { day: "Tue", value: 3 },
    { day: "Wed", value: 3 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
  ];

  
  const data = raw.map(d => ({
    ...d,
    labelValue: d.value, 
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis tick={false} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.05)" }}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1f2937",
              color: "#e2e8f0",
              borderRadius: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(v: any) => [v, "Connections"]}
          />
          <Bar
            dataKey="value"
            fill="#be185d"
            radius={[10, 10, 0, 0]}
            barSize={28}
          >
            <LabelList
              dataKey="labelValue"  
              position="insideBottom"
              fill="#ffffff"
              fontSize={25}

              offset={8}             
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
