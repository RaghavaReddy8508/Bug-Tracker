// Projects — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BugContext_24BCE0965 } from '../context/BugContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import SearchInput_24BCE0965 from '../components/ui/SearchInput';
import EmptyState_24BCE0965 from '../components/ui/EmptyState';

export default function Projects_24BCE0965() {
  const { state, dispatch } = useContext(BugContext_24BCE0965);
  const navigate_raghavaReddy = useNavigate();
  const [query_24BCE0965, setQuery_24BCE0965] = useState('');
  const [showForm_raghavaReddy, setShowForm_raghavaReddy] = useState(false);
  const [newProject_24BCE0965, setNewProject_24BCE0965] = useState({ name_raghavaReddy: '', description: '', color: '#3b5bdb' });

  const filtered_raghavaReddy = state.projects.filter(p =>
    p.name_raghavaReddy.toLowerCase().includes(query_24BCE0965.toLowerCase()) ||
    p.description.toLowerCase().includes(query_24BCE0965.toLowerCase())
  );

  const getBugCount_24BCE0965 = (projId) => state.bugs.filter(b => b.project === projId && b.status === 'open').length;

  const handleAddProject_raghavaReddy = (e) => {
    e.preventDefault();
    if (!newProject_24BCE0965.name_raghavaReddy.trim()) return;
    dispatch({ type: 'ADD_PROJECT', payload: newProject_24BCE0965 });
    setNewProject_24BCE0965({ name_raghavaReddy: '', description: '', color: '#3b5bdb' });
    setShowForm_raghavaReddy(false);
    console.log('📂 Project added — 24BCE0965 Raghava Reddy');
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Projects" subtitle_24BCE0965="Manage all projects — 24BCE0965 Raghava Reddy"
        actions_raghavaReddy={<button className="btn btn-primary" onClick={() => setShowForm_raghavaReddy(!showForm_raghavaReddy)}>➕ New Project</button>} />
      <div className="page-content" id="projects-24BCE0965">
        <SearchInput_24BCE0965 value_raghavaReddy={query_24BCE0965} onChange_24BCE0965={setQuery_24BCE0965} placeholder_raghavaReddy="Search projects — 24BCE0965..." />

        {showForm_raghavaReddy && (
          <form className="inline-form" onSubmit={handleAddProject_raghavaReddy}>
            <input className="form-input" placeholder="Project name" value={newProject_24BCE0965.name_raghavaReddy} onChange={e => setNewProject_24BCE0965(p => ({ ...p, name_raghavaReddy: e.target.value }))} />
            <input className="form-input" placeholder="Description" value={newProject_24BCE0965.description} onChange={e => setNewProject_24BCE0965(p => ({ ...p, description: e.target.value }))} />
            <input type="color" value={newProject_24BCE0965.color} onChange={e => setNewProject_24BCE0965(p => ({ ...p, color: e.target.value }))} />
            <button className="btn btn-primary" type="submit">Create — 24BCE0965</button>
            <button className="btn btn-ghost" type="button" onClick={() => setShowForm_raghavaReddy(false)}>Cancel</button>
          </form>
        )}

        {filtered_raghavaReddy.length === 0 ? (
          <EmptyState_24BCE0965 title_raghavaReddy="No projects found" message_24BCE0965="Try a different search or create a new project — 24BCE0965" />
        ) : (
          <div className="projects-grid">
            {filtered_raghavaReddy.map(project_raghavaReddy => (
              <div key={project_raghavaReddy.id} className="project-card" onClick={() => navigate_raghavaReddy(`/bugs?project=${project_raghavaReddy.id}`)} style={{ borderTopColor: project_raghavaReddy.color }}>
                <div className="project-card-header">
                  <div className="project-color" style={{ background: project_raghavaReddy.color }}></div>
                  <h3>{project_raghavaReddy.name_raghavaReddy}</h3>
                </div>
                <p className="project-desc">{project_raghavaReddy.description}</p>
                <div className="project-meta">
                  <span>🐛 {getBugCount_24BCE0965(project_raghavaReddy.id)} open bugs</span>
                  <span>👥 {project_raghavaReddy.teamSize} members</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout_24BCE0965>
  );
}
