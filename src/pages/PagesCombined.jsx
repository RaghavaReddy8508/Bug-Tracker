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

  // Feature 7: Compute dominant mood per team member
  const dominantMoods_raghavaReddy = React.useMemo(() => {
    const moodsByMember = {};
    state.team.forEach(m => moodsByMember[m.id] = {});
    
    // Aggregate moods for each member's assigned open bugs
    Object.entries(state.moods || {}).forEach(([bugId, userMoods]) => {
      const bug = state.bugs.find(b => b.id === bugId);
      if (bug && bug.status !== 'resolved' && bug.status !== 'wont-fix' && bug.assignee) {
        // Collect mood sets from the assigned user themselves
        const assigneeMood = userMoods[bug.assignee];
        if (assigneeMood && moodsByMember[bug.assignee]) {
          moodsByMember[bug.assignee][assigneeMood] = (moodsByMember[bug.assignee][assigneeMood] || 0) + 1;
        }
      }
    });

    // Find the max frequency mood per member
    const results = {};
    for (const [memberId, counts] of Object.entries(moodsByMember)) {
      let maxCount = 0;
      let dominant = null;
      for (const [mood, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          dominant = mood;
        }
      }
      results[memberId] = dominant;
    }
    return results;
  }, [state.moods, state.bugs, state.team]);

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy="Team" subtitle_24BCE0965={`${state.team.length} members — 24BCE0965`} />
      <div className="page-content" id="team-24BCE0965">
        <FilterBar_24BCE0965 label_24BCE0965="Role" active_24BCE0965={roleFilter_raghavaReddy} onChange_raghavaReddy={setRoleFilter_raghavaReddy} options_raghavaReddy={['Admin', 'Developer', 'Tester', 'Designer'].map(r => ({ value: r, label: r }))} />
        <div className="team-grid">
          {filteredTeam.map(member => (
            <MemberCard_24BCE0965 key={member.id} member_raghavaReddy={member} mood_24BCE0965={dominantMoods_raghavaReddy[member.id]} />
          ))}
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

  // Feature 3: Notification preferences from NotifContext
  const { preferences, updatePreferences_24BCE0965 } = useContext(NotifContext_24BCE0965);
  const [notifPrefs_raghavaReddy, setNotifPrefs_raghavaReddy] = useState(preferences);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newSettings = { ...settings, [name]: type === 'checkbox' ? checked : value };
    setSettings(newSettings);
    localStorage.setItem('bugtrackr_settings_24BCE0965', JSON.stringify(newSettings));
    console.log('⚙️ Settings saved — 24BCE0965 Raghava Reddy');
  };

  // Feature 3: Handle notification preference changes
  const handlePrefChange_24BCE0965 = (e) => {
    const { name, checked } = e.target;
    const newPrefs = { ...notifPrefs_raghavaReddy, [name]: checked };
    setNotifPrefs_raghavaReddy(newPrefs);
    updatePreferences_24BCE0965(newPrefs);
    console.log(`🔔 Notification pref "${name}" set to ${checked} — 24BCE0965 Raghava Reddy`);
  };

  // Feature 3: Notification preference items
  const prefItems_24BCE0965 = [
    { key: 'assignedToMe', label: '👤 Assigned to me', desc: 'Get notified when a bug is assigned to you' },
    { key: 'mentionedInComment', label: '@ Mentioned in comment', desc: 'Get notified when someone mentions you' },
    { key: 'criticalBugsOnly', label: '🔴 Critical bugs only', desc: 'Only receive notifications for Critical severity bugs' },
    { key: 'anyStatusChange', label: '🔄 Any status change', desc: 'Get notified for all status transitions' },
    { key: 'resolvedBugs', label: '✅ Resolved bugs', desc: 'Get notified when bugs are marked as resolved' },
  ];

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

              {/* Feature 3: Notification Fatigue Control — Preference Checkboxes */}
              <div className="notif-prefs-section" id="notif-prefs-24BCE0965">
                <h3 className="notif-prefs-title">🔔 Notification Preferences — 24BCE0965 Raghava Reddy</h3>
                <p className="notif-prefs-desc">Choose which events trigger notifications. Unmatched events are silently dropped from your feed.</p>
                <div className="notif-prefs-list">
                  {prefItems_24BCE0965.map(item => (
                    <div key={item.key} className="notif-pref-row" id={`pref-${item.key}-24BCE0965`}>
                      <label className="notif-pref-label">
                        <input
                          type="checkbox"
                          name={item.key}
                          checked={notifPrefs_raghavaReddy[item.key]}
                          onChange={handlePrefChange_24BCE0965}
                          className="notif-pref-checkbox"
                        />
                        <div className="notif-pref-text">
                          <span className="notif-pref-name">{item.label}</span>
                          <span className="notif-pref-desc">{item.desc}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <img src="/profile.jpg" alt="Raghava Reddy" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <div>
                <span className="severity-badge severity-low" style={{marginBottom: '8px', display: 'inline-block'}}>🟢 Open to internships · Building in public</span>
                <h1 className="bento-hero-title" style={{ margin: 0 }}>Raghava Reddy</h1>
              </div>
            </div>
            <h2 className="bento-hero-subtitle">CSE Student @ VIT Vellore · Software Engineer in the making</h2>
            <div className="bento-hero-desc">
              <p style={{marginBottom: '12px'}}>
                Second-year Computer Science undergraduate at VIT Vellore (Batch 2024–2028) building full-stack web applications and solving DSA problems daily. Targeting software engineering internships at product-based companies. Currently focused on React, Java, and CS core fundamentals.
              </p>
            </div>
          </div>

          {/* Connect Section */}
          <div className="bento-card bento-connect">
            <img src="/profile.jpg" alt="Avatar" className="about-avatar" style={{width: 64, height: 64, objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--border)', marginBottom: 16}} />
            <h3 style={{marginBottom: 8}}>Let's Connect</h3>
            <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 24}}>Open for networking and internships.</p>
            <a href="https://www.linkedin.com/in/raghavareddymallidi" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full" style={{marginBottom: 8}}>🔗 LinkedIn</a>
            <a href="/resume.pdf" download="Mallidi_Raghava_Reddy_Resume.pdf" className="btn btn-ghost btn-full" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>📥 Download Resume</a>
          </div>

          {/* Technical Arsenal */}
          <div className="bento-card bento-skills">
            <h3 style={{marginBottom: 16}}>🚀 Technical Arsenal</h3>
            
            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Languages</h4>
            <div style={{marginBottom: 16}}>
              <span className="skill-pill">Java</span><span className="skill-pill">JavaScript</span>
              <span className="skill-pill">Python</span><span className="skill-pill">C</span><span className="skill-pill">SQL</span>
            </div>
            
            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Frontend</h4>
            <div style={{marginBottom: 16}}>
              <span className="skill-pill">React.js</span><span className="skill-pill">JSX</span><span className="skill-pill">React Router v6</span>
              <span className="skill-pill">HTML5</span><span className="skill-pill">CSS3</span>
            </div>
            
            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>CS Core</h4>
            <div style={{marginBottom: 16}}>
              <span className="skill-pill">DSA (Striver A2Z)</span><span className="skill-pill">DBMS</span>
              <span className="skill-pill">OOP</span><span className="skill-pill">OS basics</span>
            </div>

            <h4 style={{fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Tools</h4>
            <div>
              <span className="skill-pill">Git</span><span className="skill-pill">GitHub</span><span className="skill-pill">VS Code</span>
              <span className="skill-pill">Notion</span><span className="skill-pill">Figma</span>
            </div>
          </div>

          {/* Featured Builds */}
          <div className="bento-card bento-builds" style={{ gridColumn: 'span 2' }}>
            <h3 style={{marginBottom: 16}}>🛠️ Featured Builds</h3>
            
            <div className="build-item" style={{borderTop: 'none', paddingTop: 0}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8}}>
                <h4 style={{fontSize: 16, color: 'var(--text)'}}>Project 1 — BugTrackr</h4>
                <span className="severity-badge severity-low">Status: In Progress</span>
              </div>
              <p style={{fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6}}>
                15-page React SPA for bug tracking. Features kanban board, analytics heatmap, smart search, focus mode, resolution prediction, and team contribution tracking. Built without a backend — pure React with localStorage persistence. Covers every React concept from class components to custom hooks.
              </p>
              <div style={{marginTop: 12}}>
                <span className="skill-pill" style={{background: 'rgba(59, 91, 219, 0.1)', borderColor: 'rgba(59, 91, 219, 0.3)'}}>React.js</span>
                <span className="skill-pill">React Router</span><span className="skill-pill">Context API</span>
                <span className="skill-pill">useReducer</span><span className="skill-pill">localStorage</span>
              </div>
            </div>

            <div className="build-item">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8}}>
                <h4 style={{fontSize: 16, color: 'var(--text)'}}>Project 3 — DSA Challenge Tracker</h4>
                <span className="severity-badge severity-medium">Status: Ongoing — Day 32 of 100</span>
              </div>
              <p style={{fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6}}>
                Publicly documenting a 100-day DSA challenge on LinkedIn using Striver's A2Z Sheet in Java. Daily posts covering time/space complexity analysis, problem patterns, and key learnings. Covers arrays, sorting, hashing, and prefix sum so far.
              </p>
              <div style={{marginTop: 12}}>
                <span className="skill-pill" style={{background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)'}}>Java</span>
                <span className="skill-pill">DSA</span><span className="skill-pill">Striver A2Z</span><span className="skill-pill">LinkedIn</span>
              </div>
            </div>
          </div>

          {/* DSA Streak */}
          <div className="bento-card" style={{ gridColumn: 'span 1' }}>
            <h3 style={{marginBottom: 16}}>🔥 DSA Streak</h3>
            <div className="meta-row"><span>Sheet</span><span>Striver A2Z</span></div>
            <div className="meta-row"><span>Language</span><span>Java</span></div>
            <div className="meta-row"><span>Current day</span><span>32 / 100</span></div>
            <div className="meta-row" style={{flexDirection: 'column', gap: 4}}>
              <span>Topics covered</span>
              <span style={{color: 'var(--text)', fontSize: 13}}>Arrays, Sorting, Hashing, Prefix Sum</span>
            </div>
            <div className="meta-row" style={{marginTop: 8}}><span>Platform</span><span>LinkedIn — daily posts</span></div>
          </div>

          {/* Academics */}
          <div className="bento-card bento-internships" style={{ gridColumn: 'span 1' }}>
            <h3 style={{marginBottom: 16}}>🎓 Academics</h3>
            <h4 style={{fontSize: 15, marginBottom: 4, color: 'var(--accent-light)'}}>Vellore Institute of Technology</h4>
            <p style={{fontSize: 13, color: 'var(--text)', marginBottom: 4}}>B.Tech — Computer Science and Engineering</p>
            <p style={{fontSize: 13, color: 'var(--text-muted)', marginBottom: 16}}>Batch: 2024 – 2028 • Semester: 4 • CGPA: 8.6 / 10</p>
            
            <h3 style={{fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8}}>Currently learning</h3>
            <ul className="portfolio-list" style={{fontSize: 13, marginLeft: 0}}>
              <li><strong>React.js</strong> — Module 6 (components, hooks, lifecycle)</li>
              <li><strong>DBMS</strong> — structured Notion notes system</li>
              <li><strong>DSA</strong> — Striver A2Z Sheet in Java</li>
            </ul>
          </div>

          {/* Experience */}
          <div className="bento-card" style={{ gridColumn: 'span 1' }}>
            <h3 style={{marginBottom: 16}}>💼 Experience</h3>
            <h4 style={{fontSize: 15, marginBottom: 4}}>Self-directed Projects</h4>
            <span className="severity-badge severity-medium" style={{display: 'inline-block', marginBottom: 12}}>Ongoing</span>
            <p style={{fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6}}>
              Building production-grade React applications independently, documenting technical decisions, and publicly sharing progress on LinkedIn. Focused on bridging academic learning with real-world software engineering practices.
            </p>
          </div>

          {/* Certifications & Languages */}
          <div className="bento-card" style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{marginBottom: 16}}>📜 Certifications</h3>
              <ul className="portfolio-list" style={{fontSize: 14, marginLeft: 0}}>
                <li>Responsive Web Design — <strong>freeCodeCamp</strong></li>
                <li>JavaScript Algorithms and Data Structures — <strong>freeCodeCamp</strong></li>
                <li>Java Programming — <strong>NPTEL / Coursera</strong></li>
                <li>React Basics — <strong>Meta on Coursera</strong></li>
              </ul>
            </div>
            <div>
              <h3 style={{marginBottom: 16}}>🌐 Languages</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div className="meta-row" style={{marginBottom: 0}}><span>Telugu</span><span>Fluent</span></div>
                <div className="meta-row" style={{marginBottom: 0}}><span>English</span><span>Fluent</span></div>
                <div className="meta-row" style={{marginBottom: 0}}><span>Hindi</span><span>Conversational</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
