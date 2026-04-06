// ============================================================
// AllBugs — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// useReducer, useMemo, filters, bulk actions
// ============================================================
import React, { useContext, useReducer, useMemo, useState } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import BugRow_24BCE0965 from '../components/bugs/BugRow';
import FilterBar_24BCE0965 from '../components/ui/FilterBar';
import SearchInput_24BCE0965 from '../components/ui/SearchInput';
import EmptyState_24BCE0965 from '../components/ui/EmptyState';
import useDebounce_24BCE0965 from '../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';

const filterReducer_raghavaReddy = (state, action) => {
  switch (action.type) {
    case 'SET_STATUS': return { ...state, status: action.payload };
    case 'SET_SEVERITY': return { ...state, severity: action.payload };
    case 'SET_PROJECT': return { ...state, project: action.payload };
    case 'RESET': return { status: '', severity: '', project: '' };
    default: return state;
  }
};

export default function AllBugs_24BCE0965() {
  const { state: bugState, dispatch: bugDispatch } = useContext(BugContext_24BCE0965);
  const [searchParams] = useSearchParams();
  const urlProject = searchParams.get('project') || '';
  const urlAssignee = searchParams.get('assignee') || '';

  const [filters_raghavaReddy, dispatchFilter_24BCE0965] = useReducer(filterReducer_raghavaReddy, {
    status: '', severity: '', project: urlProject,
  });
  const [search_24BCE0965, setSearch_24BCE0965] = useState('');
  const debouncedSearch_raghavaReddy = useDebounce_24BCE0965(search_24BCE0965, 300);
  const [sortField_raghavaReddy, setSortField_raghavaReddy] = useState('createdAt');
  const [sortDir_24BCE0965, setSortDir_24BCE0965] = useState('desc');
  const [selected_raghavaReddy, setSelected_raghavaReddy] = useState([]);

  const filteredBugs_raghavaReddy = useMemo(() => {
    let result = [...bugState.bugs];
    if (filters_raghavaReddy.status) result = result.filter(b => b.status === filters_raghavaReddy.status);
    if (filters_raghavaReddy.severity) result = result.filter(b => b.severity === filters_raghavaReddy.severity);
    if (filters_raghavaReddy.project) result = result.filter(b => b.project === filters_raghavaReddy.project);
    if (urlAssignee) result = result.filter(b => b.assignee === urlAssignee);
    if (debouncedSearch_raghavaReddy) {
      const q = debouncedSearch_raghavaReddy.toLowerCase();
      result = result.filter(b => b.title_raghavaReddy.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const aVal = a[sortField_raghavaReddy], bVal = b[sortField_raghavaReddy];
      if (sortDir_24BCE0965 === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    console.log(`🔍 Filtered bugs: ${result.length} — 24BCE0965 Raghava Reddy`);
    return result;
  }, [bugState.bugs, filters_raghavaReddy, debouncedSearch_raghavaReddy, sortField_raghavaReddy, sortDir_24BCE0965, urlAssignee]);

  const handleSort_raghavaReddy = (field) => {
    if (sortField_raghavaReddy === field) setSortDir_24BCE0965(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField_raghavaReddy(field); setSortDir_24BCE0965('asc'); }
  };

  const handleCheck_24BCE0965 = (id) => {
    setSelected_raghavaReddy(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkResolve_raghavaReddy = () => {
    selected_raghavaReddy.forEach(id => bugDispatch({ type: 'CHANGE_STATUS', payload: { bugId: id, newStatus: 'resolved', changedBy: 'user_24BCE0965' } }));
    setSelected_raghavaReddy([]);
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="All Bugs" subtitle_24BCE0965={`${filteredBugs_raghavaReddy.length} bugs — 24BCE0965`}
        actions_raghavaReddy={<Link to="/report" className="btn btn-primary">➕ Report Bug</Link>} />
      <div className="page-content" id="allbugs-24BCE0965">
        <SearchInput_24BCE0965 value_raghavaReddy={search_24BCE0965} onChange_24BCE0965={setSearch_24BCE0965} placeholder_raghavaReddy="Search bugs — 24BCE0965..." />
        <div className="filters-row">
          <FilterBar_24BCE0965 label_24BCE0965="Status" active_24BCE0965={filters_raghavaReddy.status} onChange_raghavaReddy={v => dispatchFilter_24BCE0965({ type: 'SET_STATUS', payload: v })} options_raghavaReddy={[{ value: 'open', label: '⭕ Open' }, { value: 'in-progress', label: '🔄 In Progress' }, { value: 'resolved', label: '✅ Resolved' }]} />
          <FilterBar_24BCE0965 label_24BCE0965="Severity" active_24BCE0965={filters_raghavaReddy.severity} onChange_raghavaReddy={v => dispatchFilter_24BCE0965({ type: 'SET_SEVERITY', payload: v })} options_raghavaReddy={[{ value: 'critical', label: '🔴 Critical' }, { value: 'high', label: '🟠 High' }, { value: 'medium', label: '🔵 Medium' }, { value: 'low', label: '🟢 Low' }]} />
          <button className="btn btn-ghost btn-sm" onClick={() => dispatchFilter_24BCE0965({ type: 'RESET' })}>Reset Filters</button>
        </div>

        {selected_raghavaReddy.length > 0 && (
          <div className="bulk-actions">
            <span>{selected_raghavaReddy.length} selected</span>
            <button className="btn btn-primary btn-sm" onClick={handleBulkResolve_raghavaReddy}>✅ Mark Resolved</button>
          </div>
        )}

        {filteredBugs_raghavaReddy.length === 0 ? (
          <EmptyState_24BCE0965 title_raghavaReddy="No bugs found" message_24BCE0965="Try adjusting your filters — 24BCE0965 Raghava Reddy" />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox" onChange={(e) => setSelected_raghavaReddy(e.target.checked ? filteredBugs_raghavaReddy.map(b=>b.id) : [])} /></th>
                  <th onClick={() => handleSort_raghavaReddy('id')} className="sortable">ID {sortField_raghavaReddy === 'id' ? (sortDir_24BCE0965 === 'asc' ? '↑' : '↓') : ''}</th>
                  <th onClick={() => handleSort_raghavaReddy('title_raghavaReddy')} className="sortable">Title</th>
                  <th>Severity</th><th>Status</th><th>Assignee</th>
                  <th onClick={() => handleSort_raghavaReddy('createdAt')} className="sortable">Date {sortField_raghavaReddy === 'createdAt' ? (sortDir_24BCE0965 === 'asc' ? '↑' : '↓') : ''}</th>
                </tr>
              </thead>
              <tbody>
                {filteredBugs_raghavaReddy.map(bug => (
                  <BugRow_24BCE0965 key={bug.id} bug_raghavaReddy={bug} showCheckbox_24BCE0965={true} checked_raghavaReddy={selected_raghavaReddy.includes(bug.id)} onCheck_24BCE0965={handleCheck_24BCE0965} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout_24BCE0965>
  );
}
