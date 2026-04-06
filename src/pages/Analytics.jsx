// ============================================================
// Analytics — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// recharts, date filter, useMemo
// Feature 5: Reopen Rate, Backlog Aging, MTTF
// ============================================================
import React, { useContext, useState, useMemo } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import StatCard_24BCE0965 from '../components/ui/StatCard';
import BacklogAgingChart_24BCE0965 from '../components/ui/BacklogAgingChart';
import ReopenRateCard_24BCE0965 from '../components/ui/ReopenRateCard';
import MTTFCard_24BCE0965 from '../components/ui/MTTFCard';
import BugHeatmap_24BCE0965 from '../components/ui/BugHeatmap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { subDays, isAfter, format, differenceInDays, getDay, getHours } from 'date-fns';

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

  // ===== Feature 5: Reopen Rate =====
  const reopenMetrics_24BCE0965 = useMemo(() => {
    const reopenEvents = state.activities.filter(a => a.type === 'reopened');
    const totalResolved = state.bugs.filter(b => b.status === 'resolved').length + reopenEvents.length;
    const reopenCount = reopenEvents.length;
    const reopenRate = totalResolved > 0 ? Math.round((reopenCount / totalResolved) * 100) : 0;
    return { reopenRate, reopenCount, totalResolved };
  }, [state.activities, state.bugs]);

  // ===== Feature 5: Backlog Aging =====
  const agingData_24BCE0965 = useMemo(() => {
    const openBugs = state.bugs.filter(b => b.status === 'open' || b.status === 'in-progress');
    const buckets = [
      { bucket: '0–7 days', min: 0, max: 7, count: 0 },
      { bucket: '7–30 days', min: 7, max: 30, count: 0 },
      { bucket: '30–90 days', min: 30, max: 90, count: 0 },
      { bucket: '90+ days', min: 90, max: Infinity, count: 0 },
    ];
    openBugs.forEach(bug => {
      const age = differenceInDays(new Date(), new Date(bug.createdAt));
      const bucket = buckets.find(b => age >= b.min && age < b.max);
      if (bucket) bucket.count++;
    });
    return buckets.map(({ bucket, count }) => ({ bucket, count }));
  }, [state.bugs]);

  // ===== Feature 5: Mean Time To Fix (MTTF) =====
  const mttfMetrics_24BCE0965 = useMemo(() => {
    const cutoffDate = subDays(new Date(), dateRange_raghavaReddy);
    const resolvedBugs = state.bugs.filter(b => 
      b.status === 'resolved' && 
      b.resolvedAt && 
      isAfter(new Date(b.resolvedAt), cutoffDate)
    );

    if (resolvedBugs.length === 0) {
      // Fall back to timeline-based calculation for seed data
      const resolvedWithTimeline = state.bugs.filter(b => {
        if (b.status !== 'resolved') return false;
        const resolvedEntry = b.timeline?.find(t => t.status === 'resolved');
        if (!resolvedEntry) return false;
        return isAfter(new Date(resolvedEntry.at), cutoffDate);
      });

      if (resolvedWithTimeline.length === 0) {
        return { mttfDays: 0, resolvedCount: 0, projectBreakdown: [] };
      }

      let totalDays = 0;
      const projectDays = {};
      resolvedWithTimeline.forEach(bug => {
        const resolvedEntry = bug.timeline.find(t => t.status === 'resolved');
        const days = differenceInDays(new Date(resolvedEntry.at), new Date(bug.createdAt));
        totalDays += Math.max(days, 0);
        const proj = state.projects.find(p => p.id === bug.project);
        const projName = proj ? proj.name_raghavaReddy : 'Unknown';
        if (!projectDays[projName]) projectDays[projName] = { total: 0, count: 0 };
        projectDays[projName].total += Math.max(days, 0);
        projectDays[projName].count++;
      });

      const mttfDays = Math.round(totalDays / resolvedWithTimeline.length);
      const projectBreakdown = Object.entries(projectDays)
        .map(([name, data]) => ({ name, mttf: Math.round(data.total / data.count) }))
        .sort((a, b) => a.mttf - b.mttf);

      return { mttfDays, resolvedCount: resolvedWithTimeline.length, projectBreakdown };
    }

    let totalDays = 0;
    const projectDays = {};
    resolvedBugs.forEach(bug => {
      const days = differenceInDays(new Date(bug.resolvedAt), new Date(bug.createdAt));
      totalDays += Math.max(days, 0);
      const proj = state.projects.find(p => p.id === bug.project);
      const projName = proj ? proj.name_raghavaReddy : 'Unknown';
      if (!projectDays[projName]) projectDays[projName] = { total: 0, count: 0 };
      projectDays[projName].total += Math.max(days, 0);
      projectDays[projName].count++;
    });

    const mttfDays = Math.round(totalDays / resolvedBugs.length);
    const projectBreakdown = Object.entries(projectDays)
      .map(([name, data]) => ({ name, mttf: Math.round(data.total / data.count) }))
      .sort((a, b) => a.mttf - b.mttf);

    return { mttfDays, resolvedCount: resolvedBugs.length, projectBreakdown };
  }, [state.bugs, state.projects, dateRange_raghavaReddy]);

  // ===== Feature 6: Bug Heatmap =====
  const heatmapData_24BCE0965 = useMemo(() => {
    const cutoffDate = subDays(new Date(), dateRange_raghavaReddy);
    const recentBugs = state.bugs.filter(b => isAfter(new Date(b.createdAt), cutoffDate));
    
    // Initialize 7x24 grid with 0s
    const grid = Array.from({ length: 7 }, () => Array(24).fill(0));
    let max = 0;

    recentBugs.forEach(bug => {
      const dt = new Date(bug.createdAt);
      const day = getDay(dt); // 0 (Sun) to 6 (Sat)
      const hour = getHours(dt); // 0 to 23
      grid[day][hour]++;
      if (grid[day][hour] > max) max = grid[day][hour];
    });

    return { gridData: grid, maxCount: max };
  }, [state.bugs, dateRange_raghavaReddy]);

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

        {/* ===== Feature 5: Deep Metrics Section ===== */}
        <div className="deep-metrics-section" id="deep-metrics-24BCE0965">
          <h2 className="section-title-inline">📊 Deep Metrics — 24BCE0965 Raghava Reddy</h2>
          <p className="section-subtitle-inline">Advanced analytics for process improvement</p>

          <div className="deep-metrics-grid">
            <ReopenRateCard_24BCE0965
              reopenRate_raghavaReddy={reopenMetrics_24BCE0965.reopenRate}
              reopenCount_24BCE0965={reopenMetrics_24BCE0965.reopenCount}
              totalResolved_raghavaReddy={reopenMetrics_24BCE0965.totalResolved}
            />
            <MTTFCard_24BCE0965
              mttfDays_raghavaReddy={mttfMetrics_24BCE0965.mttfDays}
              projectBreakdown_24BCE0965={mttfMetrics_24BCE0965.projectBreakdown}
              resolvedCount_raghavaReddy={mttfMetrics_24BCE0965.resolvedCount}
            />
          </div>

          <BacklogAgingChart_24BCE0965 agingData_raghavaReddy={agingData_24BCE0965} />
        </div>

        {/* ===== Feature 6: Bug Heatmap Section ===== */}
        <div className="bug-heatmap-section" id="feature-heatmap-24BCE0965" style={{ marginTop: '32px' }}>
          <BugHeatmap_24BCE0965 gridData_raghavaReddy={heatmapData_24BCE0965.gridData} maxCount_24BCE0965={heatmapData_24BCE0965.maxCount} />
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
