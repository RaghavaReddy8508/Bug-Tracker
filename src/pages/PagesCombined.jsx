// ============================================================
// Notifications, Team, ActivityLog, Settings, Profile — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================
import React, { useContext, useState } from 'react';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import { BugContext_24BCE0965 } from '../context/BugContext';
import { NotifContext_24BCE0965 } from '../context/NotifContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import MemberCard_24BCE0965 from '../components/team/MemberCard';
import FilterBar_24BCE0965 from '../components/ui/FilterBar';
import EmptyState_24BCE0965 from '../components/ui/EmptyState';
import { format } from 'date-fns';

export function Notifications_24BCE0965() {
  const { notifications, markAsRead_24BCE0965, markAllRead_24BCE0965, unreadCount } = useContext(NotifContext_24BCE0965);
  const [filter_raghavaReddy, setFilter_raghavaReddy] = useState('all');

  const filteredNotifs = notifications.filter(n => filter_raghavaReddy === 'all' || (filter_raghavaReddy === 'unread' && !n.read));

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Notifications" subtitle_24BCE0965={`You have ${unreadCount} unread notifications — 24BCE0965`}
        actions_raghavaReddy={unreadCount > 0 && <button className="btn btn-ghost" onClick={markAllRead_24BCE0965}>✓ Mark all as read</button>} />
      <div className="page-content" id="notifications-24BCE0965">
        <FilterBar_24BCE0965 active_24BCE0965={filter_raghavaReddy} onChange_raghavaReddy={setFilter_raghavaReddy} options_raghavaReddy={[{ value: 'all', label: 'All' }, { value: 'unread', label: 'Unread' }]} />
        <div className="notif-list">
          {filteredNotifs.length === 0 ? <EmptyState_24BCE0965 title_raghavaReddy="All caught up!" message_24BCE0965="No notifications matching filter — Raghava Reddy." /> : filteredNotifs.map(n => (
            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => markAsRead_24BCE0965(n.id)}>
              <div className="notif-icon">{n.type === 'assignment' ? '👤' : n.type === 'mention' ? '@' : n.type === 'resolved' ? '✅' : '🔔'}</div>
              <div className="notif-content">
                <p>{n.message}</p>
                <span className="notif-time">{format(new Date(n.at), 'MMM d, h:mm a')}</span>
              </div>
              {!n.read && <div className="notif-dot" />}
            </div>
          ))}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}

export function Team_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const [roleFilter_raghavaReddy, setRoleFilter_raghavaReddy] = useState('');
  
  const filteredTeam = roleFilter_raghavaReddy ? state.team.filter(m => m.role === roleFilter_raghavaReddy) : state.team;

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Team" subtitle_24BCE0965={`${state.team.length} members — 24BCE0965`} />
      <div className="page-content" id="team-24BCE0965">
        <FilterBar_24BCE0965 label_24BCE0965="Role" active_24BCE0965={roleFilter_raghavaReddy} onChange_raghavaReddy={setRoleFilter_raghavaReddy} options_raghavaReddy={['Admin', 'Developer', 'Tester', 'Designer'].map(r => ({ value: r, label: r }))} />
        <div className="team-grid">
          {filteredTeam.map(member => <MemberCard_24BCE0965 key={member.id} member_raghavaReddy={member} />)}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}

export function ActivityLog_24BCE0965() {
  const { state } = useContext(BugContext_24BCE0965);
  const [filter_raghavaReddy, setFilter_raghavaReddy] = useState('');

  const filteredAct = filter_raghavaReddy ? state.activities.filter(a => a.type === filter_raghavaReddy) : state.activities;

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + "ID,Type,Message,User,Date\n" + state.activities.map(a => `${a.id},${a.type},"${a.message}",${a.userId},${a.at}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bugtrackr_activities_24BCE0965.csv`);
    document.body.appendChild(link);
    link.click();
    console.log('📄 Exported Activities CSV — 24BCE0965 Raghava Reddy');
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Activity Log" subtitle_24BCE0965="All system events — 24BCE0965" actions_raghavaReddy={<button className="btn btn-ghost" onClick={exportCSV}>📥 Export CSV</button>} />
      <div className="page-content" id="activity-24BCE0965">
        <FilterBar_24BCE0965 active_24BCE0965={filter_raghavaReddy} onChange_raghavaReddy={setFilter_raghavaReddy} options_raghavaReddy={[{ value: 'created', label: 'Created' }, { value: 'resolved', label: 'Resolved' }, { value: 'comment', label: 'Comments' }, { value: 'status', label: 'Status' }]} />
        <div className="activity-timeline-full">
          {filteredAct.map(act => (
            <div key={act.id} className="activity-item-full">
              <span className="activity-icon">{act.type === 'created' ? '🆕' : act.type === 'resolved' ? '✅' : act.type === 'comment' ? '💬' : '🔄'}</span>
              <div className="activity-content">
                <p>{act.message}</p>
                <span className="activity-time">{format(new Date(act.at), 'PPP pp')} by {state.team.find(m => m.id === act.userId)?.name_raghavaReddy || act.userId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}

export function Settings_24BCE0965() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('bugtrackr_settings_24BCE0965')) || { theme: 'dark', emailNotifs: true, pushNotifs: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newSettings = { ...settings, [name]: type === 'checkbox' ? checked : value };
    setSettings(newSettings);
    localStorage.setItem('bugtrackr_settings_24BCE0965', JSON.stringify(newSettings));
    console.log('⚙️ Settings saved — 24BCE0965 Raghava Reddy');
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Settings" subtitle_24BCE0965="Preferences — 24BCE0965" />
      <div className="page-content" id="settings-24BCE0965">
        <div className="settings-tabs">
          <button className={`tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General</button>
          <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</button>
        </div>
        <div className="settings-panel">
          {activeTab === 'general' && (
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select className="form-select" name="theme" value={settings.theme} onChange={handleChange}>
                <option value="dark">Dark (Default)</option>
                <option value="light">Light</option>
              </select>
            </div>
          )}
          {activeTab === 'notifications' && (
            <>
              <div className="form-group row-checkbox">
                <input type="checkbox" name="emailNotifs" checked={settings.emailNotifs} onChange={handleChange} />
                <label>Email Notifications — 24BCE0965</label>
              </div>
              <div className="form-group row-checkbox">
                <input type="checkbox" name="pushNotifs" checked={settings.pushNotifs} onChange={handleChange} />
                <label>Push Notifications</label>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}

export function Profile_24BCE0965() {
  const { user, updateProfile_24BCE0965 } = useContext(AuthContext_24BCE0965);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name_raghavaReddy: user?.name_raghavaReddy || '', avatar: user?.avatar || '#3b5bdb' });

  const handleSave = () => {
    updateProfile_24BCE0965(editForm);
    setEditing(false);
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="My Profile" subtitle_24BCE0965={`${user?.role || 'User'} Profile — 24BCE0965`} />
      <div className="page-content" id="profile-24BCE0965">
        <div className="profile-card">
          {editing ? (
            <div className="profile-edit-box">
              <div className="form-group">
                <label>Name</label>
                <input className="form-input" value={editForm.name_raghavaReddy} onChange={e => setEditForm(p => ({ ...p, name_raghavaReddy: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Avatar Color</label>
                <input type="color" value={editForm.avatar} onChange={e => setEditForm(p => ({ ...p, avatar: e.target.value }))} />
              </div>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="profile-display">
              <div className="profile-avatar-large" style={{ background: user?.avatar }}>{user?.name_raghavaReddy?.[0] || 'R'}</div>
              <h2>{user?.name_raghavaReddy}</h2>
              <p>{user?.email} • {user?.role}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}

export function Portfolio_24BCE0965() {
  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Portfolio & Resume" subtitle_24BCE0965="Raghava Reddy Mallidi (24BCE0965)" />
      <div className="page-content" id="portfolio-24BCE0965">
        <div className="bento-container">
          {/* Hero Section */}
          <div className="bento-card bento-hero">
            <span className="severity-badge severity-medium" style={{marginBottom: '16px'}}>💻 CSE Student @ VIT Vellore</span>
            <h1 className="bento-hero-title">Raghava Reddy Mallidi</h1>
            <h2 className="bento-hero-subtitle">Aspiring Web Developer & AI Enthusiast (24BCE0965)</h2>
            <p className="bento-hero-desc">
              Building practical software tools that solve real-world problems. 
              I am a Computer Science undergraduate with a strong interest in Web Development, 
              Data Structures, and building responsive, scalable applications.
            </p>
          </div>

          {/* Connect Section */}
          <div className="bento-card bento-connect">
            <div className="about-avatar" style={{width: 64, height: 64, background: 'var(--bg-hover)', border: '1px solid var(--border)', marginBottom: 16}}>👤</div>
            <h3 style={{marginBottom: 8}}>Let's Connect</h3>
            <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 24}}>Open for internships, remote projects, and networking opportunities.</p>
            <a href="https://www.linkedin.com/in/raghavareddymallidi" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full" style={{marginBottom: 8}}>🔗 LinkedIn</a>
            <button className="btn btn-ghost btn-full">✉️ Email Me</button>
          </div>

          {/* Technical Arsenal */}
          <div className="bento-card bento-skills">
            <h3 style={{marginBottom: 16}}>🚀 Technical Arsenal</h3>
            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Languages</h4>
            <div style={{marginBottom: 16}}>
              <span className="skill-pill">C</span><span className="skill-pill">C++</span>
              <span className="skill-pill">Java</span><span className="skill-pill">JavaScript</span>
            </div>
            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Web & Tools</h4>
            <div>
              <span className="skill-pill">React</span><span className="skill-pill">HTML5/CSS</span>
              <span className="skill-pill">Git</span><span className="skill-pill">Tailwind</span>
            </div>
          </div>

          {/* Featured Builds */}
          <div className="bento-card bento-builds">
            <h3 style={{marginBottom: 16}}>🛠️ Featured Builds</h3>
            <div className="build-item" style={{borderTop: 'none', paddingTop: 0}}>
              <h4 style={{fontSize: 15, marginBottom: 4}}>BugTrackr SPA</h4>
              <p style={{fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5}}>Fully responsive React application mimicking a Jira-like environment with state management.</p>
              <div style={{marginTop: 12}}>
                <span className="skill-pill" style={{padding: '2px 8px'}}>React</span>
                <span className="skill-pill" style={{padding: '2px 8px'}}>CSS</span>
              </div>
            </div>
          </div>

          {/* Academics & Focus */}
          <div className="bento-card bento-internships">
            <h3 style={{marginBottom: 16}}>🎓 Academics</h3>
            <h4 style={{fontSize: 15, marginBottom: 4}}>Vellore Institute of Technology</h4>
            <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 16}}>B.Tech Computer Science Engineering (2024 - 2028)</p>
            
            <h3 style={{fontSize: 14, marginBottom: 8}}>Current Focus</h3>
            <ul className="portfolio-list" style={{fontSize: 13, marginLeft: 0}}>
              <li>#100DaysOfCode Challenge</li>
              <li>Mastering Web Full-stack</li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
