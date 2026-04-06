// ============================================================
// Backlog — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Shows Deferred and Won't Fix bugs, sorted by days deferred
// useMemo, useEffect, useContext, conditional rendering
// ============================================================
import React, { useContext, useMemo, useState } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import DeferredBugCard_24BCE0965 from '../components/bugs/DeferredBugCard';
import EmptyState_24BCE0965 from '../components/ui/EmptyState';
import StatCard_24BCE0965 from '../components/ui/StatCard';
import { differenceInDays } from 'date-fns';

export default function Backlog_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const [statusFilter_raghavaReddy, setStatusFilter_raghavaReddy] = useState('all');

  // Compute deferred bugs with days-deferred counter
  const deferredBugs_24BCE0965 = useMemo(() => {
    const deferredStatuses = ['deferred', 'wont-fix'];
    return state.bugs
      .filter(bug => deferredStatuses.includes(bug.status))
      .map(bug => {
        // Use the timeline to find when the bug was moved to deferred/wont-fix
        const deferredEntry = [...bug.timeline].reverse().find(
          t => t.status === 'deferred' || t.status === 'wont-fix'
        );
        const deferredSince = deferredEntry ? deferredEntry.at : bug.updatedAt;
        const daysDeferred = differenceInDays(new Date(), new Date(deferredSince));
        return { ...bug, deferredSince, daysDeferred };
      })
      .sort((a, b) => b.daysDeferred - a.daysDeferred);
  }, [state.bugs]);

  // Filter by status sub-type
  const filteredBugs_raghavaReddy = useMemo(() => {
    if (statusFilter_raghavaReddy === 'all') return deferredBugs_24BCE0965;
    return deferredBugs_24BCE0965.filter(b => b.status === statusFilter_raghavaReddy);
  }, [deferredBugs_24BCE0965, statusFilter_raghavaReddy]);

  // Compute stats
  const stats_raghavaReddy = useMemo(() => {
    const total = deferredBugs_24BCE0965.length;
    const deferred = deferredBugs_24BCE0965.filter(b => b.status === 'deferred').length;
    const wontFix = deferredBugs_24BCE0965.filter(b => b.status === 'wont-fix').length;
    const over14Days = deferredBugs_24BCE0965.filter(b => b.daysDeferred > 14).length;
    const over30Days = deferredBugs_24BCE0965.filter(b => b.daysDeferred > 30).length;
    return { total, deferred, wontFix, over14Days, over30Days };
  }, [deferredBugs_24BCE0965]);

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965
        title_raghavaReddy="Backlog"
        subtitle_24BCE0965="Deferred & Won't Fix bugs — 24BCE0965 Raghava Reddy"
        actions_raghavaReddy={
          <div className="filter-bar">
            <span className="filter-label">Status</span>
            {[
              { value: 'all', label: 'All' },
              { value: 'deferred', label: '⏸️ Deferred' },
              { value: 'wont-fix', label: "🚫 Won't Fix" },
            ].map(opt => (
              <button
                key={opt.value}
                className={`filter-pill ${statusFilter_raghavaReddy === opt.value ? 'active' : ''}`}
                onClick={() => setStatusFilter_raghavaReddy(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="page-content" id="backlog-24BCE0965">
        {/* Stats row */}
        <div className="stats-row">
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.total} label_24BCE0965="Total Backlog" icon_raghavaReddy="📦" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.deferred} label_24BCE0965="Deferred" icon_raghavaReddy="⏸️" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.wontFix} label_24BCE0965="Won't Fix" icon_raghavaReddy="🚫" />
          <StatCard_24BCE0965 value_raghavaReddy={stats_raghavaReddy.over14Days} label_24BCE0965="Over 14 Days" icon_raghavaReddy="⚠️" />
        </div>

        {/* Bug list */}
        {filteredBugs_raghavaReddy.length === 0 ? (
          <EmptyState_24BCE0965
            title_raghavaReddy="No deferred bugs! 🎉"
            message_24BCE0965="Your backlog is clean. No bugs are sitting in Deferred or Won't Fix status — Raghava Reddy 24BCE0965."
          />
        ) : (
          <div className="deferred-grid">
            {filteredBugs_raghavaReddy.map(bug => (
              <DeferredBugCard_24BCE0965
                key={bug.id}
                bug_raghavaReddy={bug}
                daysDeferred_24BCE0965={bug.daysDeferred}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout_24BCE0965>
  );
}
