// ============================================================
// BugDetail — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// useParams, lifecycle, useRef, nested components
// Features: Mood Tracker, Resolution Prediction, Bug Changelog
// ============================================================
import React, { useContext, useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BugContext_24BCE0965 } from '../context/BugContext';
import { AuthContext_24BCE0965 } from '../context/AuthContext';
import AppLayout_24BCE0965 from '../components/layout/AppLayout';
import Topbar_24BCE0965 from '../components/layout/Topbar';
import SeverityBadge_24BCE0965 from '../components/bugs/SeverityBadge';
import StatusBadge_24BCE0965 from '../components/bugs/StatusBadge';
import MoodSelector_24BCE0965 from '../components/bugs/MoodSelector';
import MoodBar_24BCE0965 from '../components/bugs/MoodBar';
import BugChangelog_24BCE0965 from '../components/bugs/BugChangelog';
import ResolutionPrediction_24BCE0965 from '../components/ui/ResolutionPrediction';
import { format, differenceInDays } from 'date-fns';

// Nested: StatusTimeline
function StatusTimeline_24BCE0965({ timeline_raghavaReddy, team }) {
  return (
    <div className="status-timeline">
      <h3 className="section-heading">Status Timeline</h3>
      {timeline_raghavaReddy.map((entry, i) => {
        const member = team.find(m => m.id === entry.changedBy);
        return (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <StatusBadge_24BCE0965 status_raghavaReddy={entry.status} />
              <span className="timeline-by">{member?.name_raghavaReddy || '24BCE0965'}</span>
              <span className="timeline-time">{format(new Date(entry.at), 'MMM d, yyyy h:mm a')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Nested: CommentForm
function CommentForm_24BCE0965({ onSubmit_raghavaReddy }) {
  const [text_24BCE0965, setText_24BCE0965] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text_24BCE0965.trim()) { onSubmit_raghavaReddy(text_24BCE0965); setText_24BCE0965(''); }
  };
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea className="form-textarea" value={text_24BCE0965} onChange={e => setText_24BCE0965(e.target.value)} placeholder="Add a comment — 24BCE0965 Raghava Reddy..." rows={3} />
      <button className="btn btn-primary btn-sm" type="submit">💬 Comment</button>
    </form>
  );
}

// Nested: CommentList
function CommentList_24BCE0965({ comments_raghavaReddy, team, scrollRef }) {
  return (
    <div className="comment-list" ref={scrollRef}>
      {comments_raghavaReddy.map(c => {
        const member = team.find(m => m.id === c.userId);
        return (
          <div key={c.id} className="comment-item">
            <div className="mini-avatar" style={{ background: member?.avatar || '#3b5bdb' }}>{member?.name_raghavaReddy?.[0] || 'R'}</div>
            <div className="comment-body">
              <div className="comment-header">
                <strong>{member?.name_raghavaReddy || '24BCE0965'}</strong>
                <span className="comment-time">{format(new Date(c.createdAt), 'MMM d, h:mm a')}</span>
              </div>
              <p>{c.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BugDetail_24BCE0965() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(BugContext_24BCE0965);
  const { user } = useContext(AuthContext_24BCE0965);
  const [editing_raghavaReddy, setEditing_raghavaReddy] = useState(false);
  const [editData_24BCE0965, setEditData_24BCE0965] = useState({});
  const commentListRef_raghavaReddy = useRef(null);
  // Feature 10: Tab for Comments vs Changelog
  const [detailTab_raghavaReddy, setDetailTab_raghavaReddy] = useState('comments');

  const bug_raghavaReddy = state.bugs.find(b => b.id === id);

  // useRef — auto-scroll to bottom on new comment
  useEffect(() => {
    if (commentListRef_raghavaReddy.current) {
      commentListRef_raghavaReddy.current.scrollTop = commentListRef_raghavaReddy.current.scrollHeight;
    }
  }, [bug_raghavaReddy?.comments?.length]);

  // Feature 7: Get mood entries for this bug
  const moodEntries_raghavaReddy = useMemo(() => {
    if (!bug_raghavaReddy) return [];
    const bugMoods = state.moods[id] || {};
    return Object.entries(bugMoods).map(([userId, mood]) => {
      const member = state.team.find(m => m.id === userId);
      return {
        memberName: member?.name_raghavaReddy || userId,
        mood,
        avatar: member?.avatar,
      };
    });
  }, [state.moods, id, state.team, bug_raghavaReddy]);

  // Feature 7: Current user's mood for this bug
  const currentUserMood_raghavaReddy = state.moods[id]?.[user?.id || 'user_24BCE0965'] || null;

  // Feature 8: Resolution Prediction
  const prediction_24BCE0965 = useMemo(() => {
    if (!bug_raghavaReddy) return { averageDays: 0, sampleSize: 0 };
    const resolvedSimilar = state.bugs.filter(b =>
      b.status === 'resolved' &&
      b.severity === bug_raghavaReddy.severity &&
      b.project === bug_raghavaReddy.project &&
      b.id !== id
    );
    if (resolvedSimilar.length === 0) return { averageDays: 0, sampleSize: 0 };

    let totalDays = 0;
    resolvedSimilar.forEach(b => {
      const resolvedEntry = b.timeline?.find(t => t.status === 'resolved');
      const resolvedAt = b.resolvedAt || resolvedEntry?.at;
      if (resolvedAt) {
        totalDays += Math.max(differenceInDays(new Date(resolvedAt), new Date(b.createdAt)), 0);
      }
    });
    const avg = Math.round((totalDays / resolvedSimilar.length) * 10) / 10;
    return { averageDays: avg, sampleSize: resolvedSimilar.length };
  }, [state.bugs, bug_raghavaReddy, id]);

  // Feature 10: Changelog for this bug
  const changelog_24BCE0965 = useMemo(() => {
    const logs = state.changelogs[id] || [];
    // Add creation entry if not present
    if (bug_raghavaReddy && logs.length === 0) {
      return [{
        field: 'created',
        oldValue: '',
        newValue: '',
        changedBy: bug_raghavaReddy.reportedBy || 'user_24BCE0965',
        changedAt: bug_raghavaReddy.createdAt,
      }];
    }
    return logs;
  }, [state.changelogs, id, bug_raghavaReddy]);

  if (!bug_raghavaReddy) {
    return (
      <AppLayout_24BCE0965>
        <div className="page-content" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>Bug not found — 24BCE0965</h2>
          <button className="btn btn-primary" onClick={() => navigate('/bugs')}>← Back to Bugs</button>
        </div>
      </AppLayout_24BCE0965>
    );
  }

  const assignee = state.team.find(m => m.id === bug_raghavaReddy.assignee);
  const reporter = state.team.find(m => m.id === bug_raghavaReddy.reportedBy);
  const project = state.projects.find(p => p.id === bug_raghavaReddy.project);
  const relatedBugs = state.bugs.filter(b => b.project === bug_raghavaReddy.project && b.id !== bug_raghavaReddy.id).slice(0, 3);

  const handleStatusChange_raghavaReddy = (newStatus) => {
    dispatch({ type: 'CHANGE_STATUS', payload: { bugId: id, newStatus, changedBy: user?.id || 'user_24BCE0965' } });
    // Feature 10: Log status change to changelog
    dispatch({ type: 'LOG_CHANGE', payload: { bugId: id, field: 'status', oldValue: bug_raghavaReddy.status, newValue: newStatus, changedBy: user?.name_raghavaReddy || 'Raghava Reddy' } });
    console.log(`🔄 Status changed to ${newStatus} — 24BCE0965 Raghava Reddy`);
  };

  const handleComment_24BCE0965 = (text) => {
    dispatch({ type: 'ADD_COMMENT', payload: { bugId: id, comment: { userId: user?.id || 'user_24BCE0965', text } } });
    // Feature 10: Log comment to changelog
    dispatch({ type: 'LOG_CHANGE', payload: { bugId: id, field: 'comment', oldValue: '', newValue: text.slice(0, 50), changedBy: user?.name_raghavaReddy || 'Raghava Reddy' } });
  };

  const handleEdit_raghavaReddy = () => {
    setEditData_24BCE0965({ title_raghavaReddy: bug_raghavaReddy.title_raghavaReddy, description: bug_raghavaReddy.description, severity: bug_raghavaReddy.severity, assignee: bug_raghavaReddy.assignee });
    setEditing_raghavaReddy(true);
  };

  const handleSaveEdit_24BCE0965 = () => {
    dispatch({ type: 'UPDATE_BUG', payload: { id, ...editData_24BCE0965 } });
    setEditing_raghavaReddy(false);
  };

  // Feature 7: Handle mood selection
  const handleMoodSelect_raghavaReddy = (mood) => {
    dispatch({ type: 'SET_MOOD', payload: { bugId: id, userId: user?.id || 'user_24BCE0965', mood } });
    // Feature 10: Log mood change to changelog
    dispatch({ type: 'LOG_CHANGE', payload: { bugId: id, field: 'mood', oldValue: currentUserMood_raghavaReddy || 'none', newValue: mood, changedBy: user?.name_raghavaReddy || 'Raghava Reddy' } });
  };

  return (
    <AppLayout_24BCE0965>
      <Topbar_24BCE0965 title_raghavaReddy={`Bug ${id.replace('bug_', 'BUG-')}`} subtitle_24BCE0965="Bug Detail — 24BCE0965 Raghava Reddy"
        actions_raghavaReddy={
          <div className="topbar-btns">
            <button className="btn btn-ghost" onClick={() => navigate('/bugs')}>← Back</button>
            <button className="btn btn-primary" onClick={handleEdit_raghavaReddy}>✏️ Edit</button>
          </div>
        }
      />
      <div className="page-content" id="bugdetail-24BCE0965">
        <div className="bug-detail-grid">
          {/* Main Content */}
          <div className="bug-detail-main">
            {editing_raghavaReddy ? (
              <div className="bug-edit-form">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input className="form-input" value={editData_24BCE0965.title_raghavaReddy} onChange={e => setEditData_24BCE0965(d => ({ ...d, title_raghavaReddy: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={editData_24BCE0965.description} onChange={e => setEditData_24BCE0965(d => ({ ...d, description: e.target.value }))} rows={5} />
                </div>
                <div className="form-row">
                  <select className="form-select" value={editData_24BCE0965.severity} onChange={e => setEditData_24BCE0965(d => ({ ...d, severity: e.target.value }))}>
                    <option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                  </select>
                  <select className="form-select" value={editData_24BCE0965.assignee} onChange={e => setEditData_24BCE0965(d => ({ ...d, assignee: e.target.value }))}>
                    {state.team.map(m => <option key={m.id} value={m.id}>{m.name_raghavaReddy}</option>)}
                  </select>
                </div>
                <div className="topbar-btns">
                  <button className="btn btn-primary" onClick={handleSaveEdit_24BCE0965}>💾 Save — 24BCE0965</button>
                  <button className="btn btn-ghost" onClick={() => setEditing_raghavaReddy(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="bug-detail-title">{bug_raghavaReddy.title_raghavaReddy}</h2>
                <div className="bug-detail-badges">
                  <SeverityBadge_24BCE0965 level_raghavaReddy={bug_raghavaReddy.severity} />
                  <StatusBadge_24BCE0965 status_raghavaReddy={bug_raghavaReddy.status} />
                  {project && <span className="bug-card-project" style={{ borderColor: project.color }}>📁 {project.name_raghavaReddy}</span>}
                </div>

                {/* Feature 7: Mood Tracker */}
                <div className="bug-detail-section mood-section" id="mood-section-24BCE0965">
                  <h3 className="section-heading">How do you feel about this bug?</h3>
                  <MoodSelector_24BCE0965 currentMood_raghavaReddy={currentUserMood_raghavaReddy} onSelect_24BCE0965={handleMoodSelect_raghavaReddy} />
                  <h4 className="section-subheading">Team Reactions</h4>
                  <MoodBar_24BCE0965 moodEntries_raghavaReddy={moodEntries_raghavaReddy} />
                </div>

                <p className="bug-detail-desc">{bug_raghavaReddy.description}</p>
                {bug_raghavaReddy.steps && (
                  <div className="bug-detail-section">
                    <h3 className="section-heading">Steps to Reproduce</h3>
                    <pre className="bug-steps">{bug_raghavaReddy.steps}</pre>
                  </div>
                )}
                {bug_raghavaReddy.environment && (
                  <div className="bug-detail-section">
                    <h3 className="section-heading">Environment</h3>
                    <p>{bug_raghavaReddy.environment}</p>
                  </div>
                )}
              </>
            )}

            {/* Status Actions */}
            <div className="bug-detail-section">
              <h3 className="section-heading">Change Status</h3>
              <div className="status-buttons">
                {['open', 'in-progress', 'resolved', 'deferred', 'wont-fix'].map(s => (
                  <button key={s} className={`btn ${bug_raghavaReddy.status === s ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => handleStatusChange_raghavaReddy(s)} disabled={bug_raghavaReddy.status === s}>
                    {s === 'open' ? '⭕' : s === 'in-progress' ? '🔄' : s === 'resolved' ? '✅' : s === 'deferred' ? '⏸️' : '🚫'} {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature 10: Tabs for Comments / Changelog */}
            <div className="bug-detail-section">
              <div className="detail-tabs">
                <button className={`tab ${detailTab_raghavaReddy === 'comments' ? 'active' : ''}`} onClick={() => setDetailTab_raghavaReddy('comments')}>
                  💬 Comments ({bug_raghavaReddy.comments.length})
                </button>
                <button className={`tab ${detailTab_raghavaReddy === 'changelog' ? 'active' : ''}`} onClick={() => setDetailTab_raghavaReddy('changelog')}>
                  📋 Changelog ({changelog_24BCE0965.length})
                </button>
              </div>

              {detailTab_raghavaReddy === 'comments' ? (
                <>
                  <CommentList_24BCE0965 comments_raghavaReddy={bug_raghavaReddy.comments} team={state.team} scrollRef={commentListRef_raghavaReddy} />
                  <CommentForm_24BCE0965 onSubmit_raghavaReddy={handleComment_24BCE0965} />
                </>
              ) : (
                <BugChangelog_24BCE0965 changelog_raghavaReddy={changelog_24BCE0965} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="bug-detail-sidebar">
            <div className="detail-meta-card">
              <h3>Details</h3>
              <div className="meta-row"><span>Assignee</span><div className="bug-card-assignee">{assignee && <><div className="mini-avatar" style={{ background: assignee.avatar }}>{assignee.name_raghavaReddy[0]}</div><span>{assignee.name_raghavaReddy}</span></>}</div></div>
              <div className="meta-row"><span>Reporter</span><span>{reporter?.name_raghavaReddy || '24BCE0965'}</span></div>
              <div className="meta-row"><span>Created</span><span>{format(new Date(bug_raghavaReddy.createdAt), 'MMM d, yyyy')}</span></div>
              <div className="meta-row"><span>Updated</span><span>{format(new Date(bug_raghavaReddy.updatedAt), 'MMM d, yyyy')}</span></div>
            </div>

            {/* Feature 8: Resolution Prediction */}
            <ResolutionPrediction_24BCE0965
              averageDays_raghavaReddy={prediction_24BCE0965.averageDays}
              sampleSize_24BCE0965={prediction_24BCE0965.sampleSize}
              severity_raghavaReddy={bug_raghavaReddy.severity}
              projectName_24BCE0965={project?.name_raghavaReddy || 'Unknown'}
            />

            <StatusTimeline_24BCE0965 timeline_raghavaReddy={bug_raghavaReddy.timeline} team={state.team} />

            {relatedBugs.length > 0 && (
              <div className="detail-meta-card">
                <h3>Related Bugs</h3>
                {relatedBugs.map(rb => (
                  <div key={rb.id} className="related-bug" onClick={() => navigate(`/bugs/${rb.id}`)}>
                    <span className="bug-card-id">{rb.id.replace('bug_', 'BUG-')}</span>
                    <span>{rb.title_raghavaReddy.slice(0, 40)}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout_24BCE0965>
  );
}
