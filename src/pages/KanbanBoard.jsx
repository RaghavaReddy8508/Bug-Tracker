// ============================================================
// KanbanBoard — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// useState, useCallback, DnD
// ============================================================
import React, { useContext, useState, useCallback, useMemo } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import SeverityBadge_24BCE0965 from '../components/bugs/SeverityBadge';
import FilterBar_24BCE0965 from '../components/ui/FilterBar';
import { useNavigate } from 'react-router-dom';

export default function KanbanBoard_24BCE0965() {
  const { state, dispatch } = useContext(BugContext_24BCE0965);
  const navigate_raghavaReddy = useNavigate();
  const [projectFilter_24BCE0965, setProjectFilter_24BCE0965] = useState('');
  const [draggedBug_raghavaReddy, setDraggedBug_raghavaReddy] = useState(null);

  const filteredBugs_raghavaReddy = useMemo(() => {
    return projectFilter_24BCE0965 ? state.bugs.filter(b => b.project === projectFilter_24BCE0965) : state.bugs;
  }, [state.bugs, projectFilter_24BCE0965]);

  const columns_24BCE0965 = useMemo(() => ({
    open: filteredBugs_raghavaReddy.filter(b => b.status === 'open'),
    'in-progress': filteredBugs_raghavaReddy.filter(b => b.status === 'in-progress'),
    resolved: filteredBugs_raghavaReddy.filter(b => b.status === 'resolved'),
  }), [filteredBugs_raghavaReddy]);

  const handleDragStart_raghavaReddy = useCallback((e, bug) => {
    setDraggedBug_raghavaReddy(bug);
    e.dataTransfer.effectAllowed = 'move';
    console.log(`🎯 Drag start — 24BCE0965 Raghava Reddy: ${bug.title_raghavaReddy}`);
  }, []);

  const handleDragOver_24BCE0965 = useCallback((e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }, []);
  const handleDragLeave_raghavaReddy = useCallback((e) => { e.currentTarget.classList.remove('drag-over'); }, []);

  const handleDrop_24BCE0965 = useCallback((e, newStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if (draggedBug_raghavaReddy && draggedBug_raghavaReddy.status !== newStatus) {
      dispatch({ type: 'CHANGE_STATUS', payload: { bugId: draggedBug_raghavaReddy.id, newStatus, changedBy: 'user_24BCE0965' } });
      console.log(`✅ Bug moved to ${newStatus} — 24BCE0965 Raghava Reddy`);
    }
    setDraggedBug_raghavaReddy(null);
  }, [draggedBug_raghavaReddy, dispatch]);

  const columnConfig_raghavaReddy = [
    { key: 'open', title: '⭕ Open', color: 'var(--critical)' },
    { key: 'in-progress', title: '🔄 In Progress', color: 'var(--high)' },
    { key: 'resolved', title: '✅ Resolved', color: 'var(--low)' },
  ];

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Kanban Board" subtitle_24BCE0965="Drag bugs between columns — 24BCE0965 Raghava Reddy" />
      <div className="page-content" id="kanban-24BCE0965">
        <FilterBar_24BCE0965 label_24BCE0965="Project" active_24BCE0965={projectFilter_24BCE0965} onChange_raghavaReddy={setProjectFilter_24BCE0965}
          options_raghavaReddy={state.projects.map(p => ({ value: p.id, label: p.name_raghavaReddy }))} />
        <div className="kanban-board">
          {columnConfig_raghavaReddy.map(col => (
            <div key={col.key} className="kanban-column"
              onDragOver={handleDragOver_24BCE0965} onDragLeave={handleDragLeave_raghavaReddy} onDrop={(e) => handleDrop_24BCE0965(e, col.key)}>
              <div className="kanban-col-header" style={{ borderBottomColor: col.color }}>
                <h3>{col.title}</h3>
                <span className="kanban-count">{columns_24BCE0965[col.key].length}</span>
              </div>
              <div className="kanban-cards">
                {columns_24BCE0965[col.key].map(bug => (
                  <div key={bug.id} className="kanban-card" draggable onDragStart={(e) => handleDragStart_raghavaReddy(e, bug)} onClick={() => navigate_raghavaReddy(`/bugs/${bug.id}`)}>
                    <div className="kanban-card-header">
                      <span className="bug-card-id">{bug.id.replace('bug_', 'BUG-')}</span>
                      <SeverityBadge_24BCE0965 level_raghavaReddy={bug.severity} />
                    </div>
                    <h4 className="kanban-card-title">{bug.title_raghavaReddy}</h4>
                    <div className="kanban-card-meta">
                      {state.team.find(m => m.id === bug.assignee) && (
                        <span className="kanban-card-assignee">
                          <div className="mini-avatar" style={{ background: state.team.find(m => m.id === bug.assignee)?.avatar }}>
                            {state.team.find(m => m.id === bug.assignee)?.name_raghavaReddy[0]}
                          </div>
                        </span>
                      )}
                      <span className="kanban-card-comments">💬 {bug.comments?.length || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
