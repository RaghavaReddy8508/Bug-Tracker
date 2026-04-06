// FocusView — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 9: Distraction-free single-bug view for Focus Mode
import React, { useContext, useMemo, useState } from 'react';
import { BugContext_24BCE0965 } from '../../context/BugContext';
import { AuthContext_24BCE0965 } from '../../context/AuthContext';
import FocusBugCard_24BCE0965 from '../bugs/FocusBugCard';

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export default function FocusView_24BCE0965({ onExit_24BCE0965 }) {
  const { state, dispatch } = useContext(BugContext_24BCE0965);
  const { user } = useContext(AuthContext_24BCE0965);
  const [currentIndex_raghavaReddy, setCurrentIndex_raghavaReddy] = useState(0);

  // Filter and sort bugs assigned to current user by severity
  const assignedBugs_24BCE0965 = useMemo(() => {
    const userId = user?.id || 'user_24BCE0965';
    return state.bugs
      .filter(b => b.assignee === userId && b.status !== 'resolved' && b.status !== 'wont-fix')
      .sort((a, b) => (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3));
  }, [state.bugs, user]);

  const handleStatusChange_raghavaReddy = (bugId, newStatus) => {
    dispatch({ type: 'CHANGE_STATUS', payload: { bugId, newStatus, changedBy: user?.id || 'user_24BCE0965' } });
    console.log(`🎯 Focus Mode status change — 24BCE0965 Raghava Reddy`);
  };

  const handlePrev = () => setCurrentIndex_raghavaReddy(i => Math.max(0, i - 1));
  const handleNext = () => setCurrentIndex_raghavaReddy(i => Math.min(assignedBugs_24BCE0965.length - 1, i + 1));

  if (assignedBugs_24BCE0965.length === 0) {
    return (
      <div className="focus-view" id="focus-view-24BCE0965">
        <div className="focus-header">
          <button className="btn btn-ghost" onClick={onExit_24BCE0965}>✕ Exit Focus Mode</button>
        </div>
        <div className="focus-empty">
          <div style={{ fontSize: '64px' }}>🎉</div>
          <h2>All clear!</h2>
          <p>No open bugs assigned to you — 24BCE0965 Raghava Reddy</p>
        </div>
      </div>
    );
  }

  const currentBug = assignedBugs_24BCE0965[currentIndex_raghavaReddy];

  return (
    <div className="focus-view" id="focus-view-24BCE0965">
      <div className="focus-header">
        <div className="focus-logo">🎯 <strong>Focus Mode</strong> — 24BCE0965</div>
        <div className="focus-progress">
          Bug {currentIndex_raghavaReddy + 1} of {assignedBugs_24BCE0965.length}
        </div>
        <button className="btn btn-ghost" onClick={onExit_24BCE0965}>✕ Exit Focus Mode</button>
      </div>
      <div className="focus-body">
        <FocusBugCard_24BCE0965
          bug_raghavaReddy={currentBug}
          onStatusChange_24BCE0965={handleStatusChange_raghavaReddy}
        />
      </div>
      <div className="focus-footer">
        <button className="btn btn-ghost" onClick={handlePrev} disabled={currentIndex_raghavaReddy === 0}>
          ← Previous
        </button>
        <div className="focus-dots">
          {assignedBugs_24BCE0965.map((_, i) => (
            <span key={i} className={`focus-dot ${i === currentIndex_raghavaReddy ? 'active' : ''}`}
              onClick={() => setCurrentIndex_raghavaReddy(i)} />
          ))}
        </div>
        <button className="btn btn-ghost" onClick={handleNext} disabled={currentIndex_raghavaReddy === assignedBugs_24BCE0965.length - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}
