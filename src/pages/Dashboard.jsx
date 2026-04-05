// ============================================================
// Dashboard — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// useEffect, componentDidMount, stats, useMemo
// ============================================================
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BugContext_24BCE0965 } from '../context/BugContext';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import StatCard_24BCE0965 from '../components/ui/StatCard';
import BugRow_24BCE0965 from '../components/bugs/BugRow';
import { format } from 'date-fns';

export default function Dashboard_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const { user } = useContext(AuthContext_24BCE0965);

  const stats_raghavaReddy = useMemo(() => {
    const total = state.bugs.length;
    const open = state.bugs.filter(b => b.status === 'open').length;
    const inProgress = state.bugs.filter(b => b.status === 'in-progress').length;
    const resolved = state.bugs.filter(b => b.status === 'resolved').length;
    const critical = state.bugs.filter(b => b.severity === 'critical').length;
    console.log(`📊 Dashboard stats computed — 24BCE0965 Raghava Reddy — Total: ${total}`);
    return { total, open, inProgress, resolved, critical };
  }, [state.bugs]);

  const recentBugs_raghavaReddy = useMemo(() => {
    return [...state.bugs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 7);
  }, [state.bugs]);

  const severityData_24BCE0965 = useMemo(() => {
    const critical = state.bugs.filter(b => b.severity === 'critical').length;
    const high = state.bugs.filter(b => b.severity === 'high').length;
    const medium = state.bugs.filter(b => b.severity === 'medium').length;
    const low = state.bugs.filter(b => b.severity === 'low').length;
    const max = Math.max(critical, high, medium, low, 1);
    return [
      { label: 'Critical', count: critical, pct: (critical / max) * 100, color: 'var(--critical)' },
      { label: 'High', count: high, pct: (high / max) * 100, color: 'var(--high)' },
      { label: 'Medium', count: medium, pct: (medium / max) * 100, color: 'var(--medium)' },
      { label: 'Low', count: low, pct: (low / max) * 100, color: 'var(--low)' },
    ];
  }, [state.bugs]);

  const recentActivities_raghavaReddy = useMemo(() => {
    return [...state.activities].sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 8);
  }, [state.activities]);

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965
        title_raghavaReddy="Dashboard"
        subtitle_24BCE0965={`Welcome back, ${user?.name_raghavaReddy || 'Raghava Reddy'} — 24BCE0965`}
        actions_raghavaReddy={
          <div className="topbar-btns">
            <Link to="/report" className="btn btn-primary">➕ Report Bug</Link>
            <Link to="/bugs" className="btn btn-ghost">View All Bugs</Link>
          </div>
        }
      />

      <div className="page-content" id="dashboard-24BCE0965">
        {/* Stats Row */}
        <div className="stats-row">
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.total} label_24BCE0965="Total Bugs" icon_raghavaReddy="🐛" delta_raghavaReddy={12} deltaType_24BCE0965="up" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.open} label_24BCE0965="Open" icon_raghavaReddy="⭕" delta_raghavaReddy={8} deltaType_24BCE0965="up" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.inProgress} label_24BCE0965="In Progress" icon_raghavaReddy="🔄" delta_raghavaReddy={5} deltaType_24BCE0965="down" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.resolved} label_24BCE0965="Resolved" icon_raghavaReddy="✅" delta_raghavaReddy={15} deltaType_24BCE0965="up" />
        </div>

        <div className="dashboard-grid">
          {/* Recent Bugs Table */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Recent Bugs</h2>
              <Link to="/bugs" className="card-link">View all →</Link>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>ID</th><th>Title</th><th>Severity</th><th>Status</th><th>Assignee</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {recentBugs_raghavaReddy.map(bug => (
                    <BugRow_24BCE0965 key={bug.id} bug_raghavaReddy={bug} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Severity Chart */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Severity Distribution</h2>
            </div>
            <div className="severity-chart">
              {severityData_24BCE0965.map(s => (
                <div key={s.label} className="severity-bar-row">
                  <span className="severity-bar-label">{s.label}</span>
                  <div className="severity-bar-track">
                    <div className="severity-bar-fill" style={{ width: `${s.pct}%`, background: s.color }}></div>
                  </div>
                  <span className="severity-bar-count">{s.count}</span>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            <div className="card-header" style={{ marginTop: '24px' }}>
              <h2 className="card-title">Recent Activity</h2>
              <Link to="/activity" className="card-link">View all →</Link>
            </div>
            <div className="activity-feed">
              {recentActivities_raghavaReddy.map(act => (
                <div key={act.id} className="activity-item">
                  <span className="activity-icon">
                    {act.type === 'created' ? '🆕' : act.type === 'resolved' ? '✅' : act.type === 'comment' ? '💬' : act.type === 'assigned' ? '👤' : '🔄'}
                  </span>
                  <span className="activity-msg">{act.message}</span>
                  <span className="activity-time">{format(new Date(act.at), 'MMM d, h:mm a')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
