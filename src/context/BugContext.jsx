// ============================================================
// BugContext — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Global bug state with useReducer
// ============================================================

import React, { createContext, useReducer, useEffect } from 'react';
import {
  seedBugs_24BCE0965,
  seedProjects_24BCE0965,
  seedTeam_24BCE0965,
  seedActivities_24BCE0965,
} from '../data/seed';

export const BugContext_24BCE0965 = createContext(null);

const initialState_raghavaReddy = {
  bugs: [],
  projects: [],
  team: [],
  activities: [],
  moods: {},
  changelogs: {},
};

function bugReducer_24BCE0965(state_raghavaReddy, action_24BCE0965) {
  switch (action_24BCE0965.type) {
    case 'LOAD_SEED_DATA':
      console.log('📦 Seed data loaded into BugContext — 24BCE0965 Raghava Reddy');
      return {
        bugs: action_24BCE0965.payload.bugs,
        projects: action_24BCE0965.payload.projects,
        team: action_24BCE0965.payload.team,
        activities: action_24BCE0965.payload.activities,
        moods: action_24BCE0965.payload.moods || {},
        changelogs: action_24BCE0965.payload.changelogs || {},
      };
    case 'ADD_BUG': {
      const newBug_raghavaReddy = {
        ...action_24BCE0965.payload,
        id: `bug_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        timeline: [{ status: action_24BCE0965.payload.status || 'open', changedBy: action_24BCE0965.payload.reportedBy, at: new Date().toISOString() }],
      };
      const newActivity_raghavaReddy = {
        id: `act_${Date.now()}`,
        type: 'created',
        bugId: newBug_raghavaReddy.id,
        userId: newBug_raghavaReddy.reportedBy,
        message: `Bug "${newBug_raghavaReddy.title_raghavaReddy}" created — 24BCE0965`,
        at: new Date().toISOString(),
      };
      console.log(`🐛 Bug added — 24BCE0965 Raghava Reddy: ${newBug_raghavaReddy.title_raghavaReddy}`);
      return {
        ...state_raghavaReddy,
        bugs: [...state_raghavaReddy.bugs, newBug_raghavaReddy],
        activities: [newActivity_raghavaReddy, ...state_raghavaReddy.activities],
      };
    }
    // UPDATE_BUG with changelog logging (merged — 24BCE0965 Raghava Reddy)
    case 'DELETE_BUG':
      return {
        ...state_raghavaReddy,
        bugs: state_raghavaReddy.bugs.filter((b) => b.id !== action_24BCE0965.payload),
      };
    case 'CHANGE_STATUS': {
      const { bugId, newStatus, changedBy } = action_24BCE0965.payload;
      // Feature 5: Detect reopen events (resolved -> open)
      const currentBug_raghavaReddy = state_raghavaReddy.bugs.find(b => b.id === bugId);
      const isReopen_24BCE0965 = currentBug_raghavaReddy && currentBug_raghavaReddy.status === 'resolved' && newStatus === 'open';
      const updatedBugs2_raghavaReddy = state_raghavaReddy.bugs.map((bug) => {
        if (bug.id === bugId) {
          const updatedFields = {
            ...bug,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...bug.timeline,
              { status: newStatus, changedBy, at: new Date().toISOString() },
            ],
          };
          // Feature 5: Track resolvedAt for MTTF calculation
          if (newStatus === 'resolved') {
            updatedFields.resolvedAt = new Date().toISOString();
          }
          return updatedFields;
        }
        return bug;
      });
      const newActivities_raghavaReddy = [];
      // Standard status change activity
      newActivities_raghavaReddy.push({
        id: `act_${Date.now()}`,
        type: 'status',
        bugId,
        userId: changedBy,
        message: `Bug status changed to "${newStatus}" — 24BCE0965 Raghava Reddy`,
        at: new Date().toISOString(),
      });
      // Feature 5: Log reopened event for reopen rate computation
      if (isReopen_24BCE0965) {
        newActivities_raghavaReddy.push({
          id: `act_${Date.now()}_reopen`,
          type: 'reopened',
          bugId,
          userId: changedBy,
          message: `Bug "${currentBug_raghavaReddy.title_raghavaReddy}" reopened — 24BCE0965 Raghava Reddy`,
          at: new Date().toISOString(),
        });
        console.log(`🔁 Bug reopened — 24BCE0965 Raghava Reddy: ${currentBug_raghavaReddy.title_raghavaReddy}`);
      }
      return {
        ...state_raghavaReddy,
        bugs: updatedBugs2_raghavaReddy,
        activities: [...newActivities_raghavaReddy, ...state_raghavaReddy.activities],
      };
    }
    case 'ADD_COMMENT': {
      const { bugId: cBugId, comment } = action_24BCE0965.payload;
      const newComment_raghavaReddy = {
        id: `c_${Date.now()}`,
        ...comment,
        createdAt: new Date().toISOString(),
      };
      const updatedBugs3_raghavaReddy = state_raghavaReddy.bugs.map((bug) => {
        if (bug.id === cBugId) {
          return { ...bug, comments: [...bug.comments, newComment_raghavaReddy] };
        }
        return bug;
      });
      const commentActivity_raghavaReddy = {
        id: `act_${Date.now()}`,
        type: 'comment',
        bugId: cBugId,
        userId: comment.userId,
        message: `Comment added — 24BCE0965 Raghava Reddy`,
        at: new Date().toISOString(),
      };
      return {
        ...state_raghavaReddy,
        bugs: updatedBugs3_raghavaReddy,
        activities: [commentActivity_raghavaReddy, ...state_raghavaReddy.activities],
      };
    }
    case 'ADD_PROJECT': {
      const newProj_raghavaReddy = {
        ...action_24BCE0965.payload,
        id: `proj_${Date.now()}`,
        createdAt: new Date().toISOString(),
        openBugs: 0,
        teamSize: 1,
      };
      console.log(`📂 Project added — 24BCE0965 Raghava Reddy: ${newProj_raghavaReddy.name_raghavaReddy}`);
      return {
        ...state_raghavaReddy,
        projects: [...state_raghavaReddy.projects, newProj_raghavaReddy],
      };
    }
    case 'UPDATE_PROJECT': {
      const updatedProjects_raghavaReddy = state_raghavaReddy.projects.map((p) =>
        p.id === action_24BCE0965.payload.id ? { ...p, ...action_24BCE0965.payload } : p
      );
      return { ...state_raghavaReddy, projects: updatedProjects_raghavaReddy };
    }
    case 'ADD_ACTIVITY': {
      return {
        ...state_raghavaReddy,
        activities: [action_24BCE0965.payload, ...state_raghavaReddy.activities],
      };
    }
    // Feature 7: Bug Mood Tracker — SET_MOOD
    case 'SET_MOOD': {
      const { bugId: mBugId, userId: mUserId, mood: moodValue } = action_24BCE0965.payload;
      const updatedMoods = {
        ...state_raghavaReddy.moods,
        [mBugId]: {
          ...(state_raghavaReddy.moods[mBugId] || {}),
          [mUserId]: moodValue,
        },
      };
      console.log(`😊 Mood set: ${moodValue} for bug ${mBugId} — 24BCE0965 Raghava Reddy`);
      return { ...state_raghavaReddy, moods: updatedMoods };
    }
    // Feature 10: Bug Changelog — LOG_CHANGE
    case 'LOG_CHANGE': {
      const { bugId: lBugId, field, oldValue, newValue, changedBy: lChangedBy } = action_24BCE0965.payload;
      const entry = { field, oldValue, newValue, changedBy: lChangedBy, changedAt: new Date().toISOString() };
      const existingLog = state_raghavaReddy.changelogs[lBugId] || [];
      return {
        ...state_raghavaReddy,
        changelogs: { ...state_raghavaReddy.changelogs, [lBugId]: [...existingLog, entry] },
      };
    }
    // Feature 10: UPDATE_BUG with changelog logging — 24BCE0965 Raghava Reddy
    case 'UPDATE_BUG': {
      const { id: uBugId, ...updates } = action_24BCE0965.payload;
      const oldBug = state_raghavaReddy.bugs.find(b => b.id === uBugId);
      const updatedBugsU = state_raghavaReddy.bugs.map(bug =>
        bug.id === uBugId ? { ...bug, ...updates, updatedAt: new Date().toISOString() } : bug
      );
      // Auto-log changes to changelog
      const changeEntries = [];
      if (oldBug) {
        ['title_raghavaReddy', 'description', 'severity', 'assignee'].forEach(field => {
          if (updates[field] !== undefined && updates[field] !== oldBug[field]) {
            changeEntries.push({
              field, oldValue: String(oldBug[field]), newValue: String(updates[field]),
              changedBy: 'user_24BCE0965', changedAt: new Date().toISOString(),
            });
          }
        });
      }
      const existingCL = state_raghavaReddy.changelogs[uBugId] || [];
      return {
        ...state_raghavaReddy,
        bugs: updatedBugsU,
        changelogs: changeEntries.length > 0
          ? { ...state_raghavaReddy.changelogs, [uBugId]: [...existingCL, ...changeEntries] }
          : state_raghavaReddy.changelogs,
      };
    }
    default:
      return state_raghavaReddy;
  }
}

export function BugProvider_24BCE0965({ children }) {
  const [state_raghavaReddy, dispatch_24BCE0965] = useReducer(
    bugReducer_24BCE0965,
    initialState_raghavaReddy
  );

  // componentDidMount equivalent — load seed data if empty
  useEffect(() => {
    const storedBugs_24BCE0965 = localStorage.getItem('bugtrackr_bugs_24BCE0965');
    if (storedBugs_24BCE0965) {
      try {
        const parsed = JSON.parse(storedBugs_24BCE0965);
        dispatch_24BCE0965({
          type: 'LOAD_SEED_DATA',
          payload: {
            bugs: parsed.bugs || seedBugs_24BCE0965,
            projects: parsed.projects || seedProjects_24BCE0965,
            team: parsed.team || seedTeam_24BCE0965,
            activities: parsed.activities || seedActivities_24BCE0965,
          },
        });
      } catch {
        dispatch_24BCE0965({
          type: 'LOAD_SEED_DATA',
          payload: {
            bugs: seedBugs_24BCE0965,
            projects: seedProjects_24BCE0965,
            team: seedTeam_24BCE0965,
            activities: seedActivities_24BCE0965,
          },
        });
      }
    } else {
      dispatch_24BCE0965({
        type: 'LOAD_SEED_DATA',
        payload: {
          bugs: seedBugs_24BCE0965,
          projects: seedProjects_24BCE0965,
          team: seedTeam_24BCE0965,
          activities: seedActivities_24BCE0965,
        },
      });
    }
  }, []);

  // Auto-save to localStorage when state changes
  useEffect(() => {
    if (state_raghavaReddy.bugs.length > 0) {
      localStorage.setItem(
        'bugtrackr_bugs_24BCE0965',
        JSON.stringify(state_raghavaReddy)
      );
    }
  }, [state_raghavaReddy]);

  return (
    <BugContext_24BCE0965.Provider value={{ state: state_raghavaReddy, dispatch: dispatch_24BCE0965 }}>
      {children}
    </BugContext_24BCE0965.Provider>
  );
}
