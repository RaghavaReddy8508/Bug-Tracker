// ============================================================
// SmartSearch — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// uncontrolled input, useRef, debouncing
// ============================================================
import React, { useContext, useRef, useState, useMemo, useEffect } from 'react';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import useDebounce_24BCE0965 from '../hooks/useDebounce';
import SeverityBadge_24BCE0965 from '../components/bugs/SeverityBadge';
import { useNavigate } from 'react-router-dom';

export default function SmartSearch_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const navigate = useNavigate();
  const inputRef_24BCE0965 = useRef(null);
  const [query_raghavaReddy, setQuery_raghavaReddy] = useState('');
  const debouncedQuery_24BCE0965 = useDebounce_24BCE0965(query_raghavaReddy, 300);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef_24BCE0965.current) inputRef_24BCE0965.current.focus();
  }, []);

  const results_raghavaReddy = useMemo(() => {
    if (!debouncedQuery_24BCE0965) return { bugs: [], projects: [], team: [] };
    const q = debouncedQuery_24BCE0965.toLowerCase();
    return {
      bugs: state.bugs.filter(b => b.title_raghavaReddy.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)),
      projects: state.projects.filter(p => p.name_raghavaReddy.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      team: state.team.filter(m => m.name_raghavaReddy.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)),
    };
  }, [debouncedQuery_24BCE0965, state]);

  // Handle uncontrolled input
  const handleInput_24BCE0965 = () => {
    if (inputRef_24BCE0965.current) {
      setQuery_raghavaReddy(inputRef_24BCE0965.current.value);
    }
  };

  const highlightMatch_raghavaReddy = (text, q) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return parts.map((p, i) => p.toLowerCase() === q.toLowerCase() ? <strong key={i} className="highlight">{p}</strong> : p);
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Smart Search" subtitle_24BCE0965="Global search across all data — 24BCE0965" />
      <div className="page-content" id="search-24BCE0965">
        <div className="search-hero">
          <input 
            ref={inputRef_24BCE0965}
            type="text" 
            className="search-input-large" 
            placeholder="Type to search bugs, projects, or people... (24BCE0965)"
            defaultValue={query_raghavaReddy}
            onChange={handleInput_24BCE0965}
          />
        </div>

        {!debouncedQuery_24BCE0965 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Search everything</h3>
            <p>Start typing to find bugs, projects, and team members — Raghava Reddy</p>
          </div>
        ) : (
          <div className="search-results-grid">
            {results_raghavaReddy.bugs.length > 0 && (
              <div className="search-section">
                <h3 className="section-heading">Bugs ({results_raghavaReddy.bugs.length})</h3>
                {results_raghavaReddy.bugs.map(b => (
                  <div key={b.id} className="search-result-item" onClick={() => navigate(`/bugs/${b.id}`)}>
                    <div className="result-header">
                      <span className="bug-card-id">{b.id.replace('bug_', 'BUG-')}</span>
                      <SeverityBadge_24BCE0965 level_raghavaReddy={b.severity} />
                    </div>
                    <h4>{highlightMatch_raghavaReddy(b.title_raghavaReddy, debouncedQuery_24BCE0965)}</h4>
                    <p>{highlightMatch_raghavaReddy(b.description.slice(0, 80), debouncedQuery_24BCE0965)}...</p>
                  </div>
                ))}
              </div>
            )}
            {results_raghavaReddy.projects.length > 0 && (
              <div className="search-section">
                <h3 className="section-heading">Projects ({results_raghavaReddy.projects.length})</h3>
                {results_raghavaReddy.projects.map(p => (
                  <div key={p.id} className="search-result-item" onClick={() => navigate(`/bugs?project=${p.id}`)}>
                    <h4><span style={{ color: p.color }}>📁</span> {highlightMatch_raghavaReddy(p.name_raghavaReddy, debouncedQuery_24BCE0965)}</h4>
                    <p>{highlightMatch_raghavaReddy(p.description, debouncedQuery_24BCE0965)}</p>
                  </div>
                ))}
              </div>
            )}
            {results_raghavaReddy.team.length > 0 && (
              <div className="search-section">
                <h3 className="section-heading">Team ({results_raghavaReddy.team.length})</h3>
                {results_raghavaReddy.team.map(m => (
                  <div key={m.id} className="search-result-item" onClick={() => navigate(`/bugs?assignee=${m.id}`)}>
                    <div className="result-header">
                      <div className="mini-avatar" style={{ background: m.avatar }}>{m.name_raghavaReddy[0]}</div>
                      <h4>{highlightMatch_raghavaReddy(m.name_raghavaReddy, debouncedQuery_24BCE0965)}</h4>
                    </div>
                    <p>{highlightMatch_raghavaReddy(m.role, debouncedQuery_24BCE0965)} • {m.email}</p>
                  </div>
                ))}
              </div>
            )}
            {results_raghavaReddy.bugs.length === 0 && results_raghavaReddy.projects.length === 0 && results_raghavaReddy.team.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🤷</div>
                <h3>No results found</h3>
                <p>We couldn't find anything matching "{debouncedQuery_24BCE0965}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout_24BCE0965>
  );
}
