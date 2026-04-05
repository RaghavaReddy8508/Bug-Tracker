// ============================================================
// Analytics — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// recharts, date filter, useMemo
// ============================================================
import React, { useContext, useState, useMemo } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import StatCard_24BCE0965 from '../components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { subDays, isAfter, format } from 'date-fns';

export default function Analytics_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const [dateRange_raghavaReddy, setDateRange_raghavaReddy] = useState(30);

  const filteredBugs_24BCE0965 = useMemo(() => {
    const cutoffDate = subDays(new Date(), dateRange_raghavaReddy);
    return state.bugs.filter(b => isAfter(new Date(b.createdAt), cutoffDate));
  }, [state.bugs, dateRange_raghavaReddy]);

  const stats_raghavaReddy = useMemo(() => {
    const total = filteredBugs_24BCE0965.length;
    const resolved = filteredBugs_24BCE0965.filter(b => b.status === 'resolved').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const critical = filteredBugs_24BCE0965.filter(b => b.severity === 'critical').length;
    return { total, resolved, rate, critical };
  }, [filteredBugs_24BCE0965]);

  const chartData_24BCE0965 = useMemo(() => {
    const data = {};
    for (let i = dateRange_raghavaReddy - 1; i >= 0; i--) {
      const d = format(subDays(new Date(), i), 'MMM d');
      data[d] = { name: d, opened: 0, resolved: 0 };
    }
    filteredBugs_24BCE0965.forEach(b => {
      const d = format(new Date(b.createdAt), 'MMM d');
      if (data[d]) {
        data[d].opened++;
        if (b.status === 'resolved') data[d].resolved++;
      }
    });
    return Object.values(data);
  }, [filteredBugs_24BCE0965, dateRange_raghavaReddy]);

  const leaderboard_raghavaReddy = useMemo(() => {
    const counts = {};
    state.bugs.filter(b => b.status === 'resolved').forEach(b => {
      if (b.assignee) { counts[b.assignee] = (counts[b.assignee] || 0) + 1; }
    });
    return Object.entries(counts)
      .map(([id, count]) => ({ member: state.team.find(m => m.id === id), count }))
      .filter(x => x.member)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [state.bugs, state.team]);

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Analytics" subtitle_24BCE0965="Insights and reporting — 24BCE0965"
        actions_raghavaReddy={
          <select className="form-select" value={dateRange_raghavaReddy} onChange={e => setDateRange_raghavaReddy(Number(e.target.value))}>
            <option value={7}>Last 7 Days</option>
            <option value={14}>Last 14 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        }
      />
      <div className="page-content" id="analytics-24BCE0965">
        <div className="stats-row">
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.total} label_24BCE0965="Bugs Filed" icon_raghavaReddy="📈" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.resolved} label_24BCE0965="Bugs Resolved" icon_raghavaReddy="✅" />
          <StatCard_24BCE0965 value_raghavaReddy={`${stats_raghavaReddy.rate}%`} label_24BCE0965="Resolution Rate" icon_raghavaReddy="⚡" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.critical} label_24BCE0965="Critical Bugs" icon_raghavaReddy="🚨" />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card" style={{ gridColumn: 'span 2', height: '400px' }}>
            <h2 className="card-title">Bug Volume Over Time</h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData_24BCE0965} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Bar dataKey="opened" fill="var(--high)" radius={[4, 4, 0, 0]} name="Opened" isAnimationActive={true} animationDuration={1000} animationEasing="ease" />
                <Bar dataKey="resolved" fill="var(--low)" radius={[4, 4, 0, 0]} name="Resolved" isAnimationActive={true} animationDuration={1000} animationEasing="ease" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Top Solvers (All Time)</h2>
            <div className="leaderboard">
              {leaderboard_raghavaReddy.map((l, i) => (
                <div key={l.member.id} className="leaderboard-item">
                  <div className="leader-rank">{i + 1}</div>
                  <div className="leader-info">
                    <div className="mini-avatar" style={{ background: l.member.avatar }}>{l.member.name_raghavaReddy[0]}</div>
                    <span>{l.member.name_raghavaReddy}</span>
                  </div>
                  <div className="leader-score">{l.count} <span className="text-muted">resolved</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
