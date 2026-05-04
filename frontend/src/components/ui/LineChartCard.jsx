import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function LineChartCard({ title, data, xKey, yKey }) {
  if (!data || data.length === 0) {
    return null;
  }

  const values = data.map((item) => item[yKey]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding = Math.max(1, (max - min) * 0.25);

  const yMin = Math.floor(min - padding);
  const yMax = Math.ceil(max + padding);

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold text-primary mb-3">{title}</h4>

        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis domain={[yMin, yMax]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={yKey}
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default LineChartCard;