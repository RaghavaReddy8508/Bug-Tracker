// ============================================================
// BacklogAgingChart — Functional Component — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Horizontal bar chart showing age distribution of open bugs
// ============================================================
import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const bucketColors_24BCE0965 = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function BacklogAgingChart_24BCE0965({ agingData_raghavaReddy }) {
  if (!agingData_raghavaReddy || agingData_raghavaReddy.length === 0) {
    return (
      <div className="metric-empty-state">
        <p>📊 Not enough data to display backlog aging chart — 24BCE0965</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card backlog-aging-chart" id="backlog-aging-chart-24BCE0965">
      <h2 className="card-title">📊 Backlog Aging — 24BCE0965</h2>
      <p className="chart-subtitle-text">Age distribution of currently open bugs</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={agingData_raghavaReddy}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="bucket"
            stroke="var(--text-muted)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            cursor={{ fill: 'var(--bg-hover)' }}
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
            }}
          />
          <Bar
            dataKey="count"
            radius={[0, 6, 6, 0]}
            name="Bugs"
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease"
          >
            {agingData_raghavaReddy.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={bucketColors_24BCE0965[index % bucketColors_24BCE0965.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

BacklogAgingChart_24BCE0965.propTypes = {
  agingData_raghavaReddy: PropTypes.arrayOf(
    PropTypes.shape({
      bucket: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};
