// ============================================================
// NotifContext — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Feature 3: Notification Fatigue Control with preference filtering
// ============================================================

import React, { createContext, useState, useEffect } from 'react';
import { seedNotifications_24BCE0965 } from '../data/seed';

export const NotifContext_24BCE0965 = createContext(null);

// Default notification preferences — 24BCE0965 Raghava Reddy
const defaultPreferences_24BCE0965 = {
  assignedToMe: true,
  mentionedInComment: true,
  criticalBugsOnly: false,
  anyStatusChange: true,
  resolvedBugs: true,
};

export function NotifProvider_24BCE0965({ children }) {
  const [notifications_raghavaReddy, setNotifications_raghavaReddy] = useState(() => {
    const stored = localStorage.getItem('bugtrackr_notifs_24BCE0965');
    return stored ? JSON.parse(stored) : seedNotifications_24BCE0965;
  });

  // Feature 3: Notification preferences from localStorage
  const [preferences_raghavaReddy, setPreferences_raghavaReddy] = useState(() => {
    const stored = localStorage.getItem('bugtrackr_notif_prefs_24BCE0965');
    return stored ? JSON.parse(stored) : defaultPreferences_24BCE0965;
  });

  // Feature 3: Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem('bugtrackr_notif_prefs_24BCE0965', JSON.stringify(preferences_raghavaReddy));
    console.log('🔔 Notification preferences updated — 24BCE0965 Raghava Reddy');
  }, [preferences_raghavaReddy]);

  // Feature 3: Filter notifications based on user preferences
  const filteredNotifications_24BCE0965 = notifications_raghavaReddy.filter((notif) => {
    if (preferences_raghavaReddy.assignedToMe && notif.type === 'assignment') return true;
    if (preferences_raghavaReddy.mentionedInComment && notif.type === 'mention') return true;
    if (preferences_raghavaReddy.resolvedBugs && notif.type === 'resolved') return true;
    if (preferences_raghavaReddy.anyStatusChange && notif.type === 'status') return true;
    if (preferences_raghavaReddy.criticalBugsOnly && notif.type === 'escalated') return true;
    // If no preference matches but notification doesn't have a recognized type, show it
    if (!['assignment', 'mention', 'resolved', 'status', 'escalated'].includes(notif.type)) return true;
    return false;
  });

  const unreadCount_24BCE0965 = filteredNotifications_24BCE0965.filter((n) => !n.read).length;

  useEffect(() => {
    localStorage.setItem('bugtrackr_notifs_24BCE0965', JSON.stringify(notifications_raghavaReddy));
  }, [notifications_raghavaReddy]);

  const markAsRead_24BCE0965 = (id) => {
    setNotifications_raghavaReddy((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead_24BCE0965 = () => {
    setNotifications_raghavaReddy((prev) => prev.map((n) => ({ ...n, read: true })));
    console.log('✅ All notifications marked read — 24BCE0965 Raghava Reddy');
  };

  const addNotification_24BCE0965 = (notif) => {
    // Feature 3: Check against preferences before adding
    const shouldAdd = (() => {
      if (preferences_raghavaReddy.assignedToMe && notif.type === 'assignment') return true;
      if (preferences_raghavaReddy.mentionedInComment && notif.type === 'mention') return true;
      if (preferences_raghavaReddy.resolvedBugs && notif.type === 'resolved') return true;
      if (preferences_raghavaReddy.anyStatusChange && notif.type === 'status') return true;
      if (preferences_raghavaReddy.criticalBugsOnly && notif.type === 'escalated') return true;
      if (!['assignment', 'mention', 'resolved', 'status', 'escalated'].includes(notif.type)) return true;
      return false;
    })();

    if (shouldAdd) {
      setNotifications_raghavaReddy((prev) => [
        { id: `notif_${Date.now()}`, read: false, at: new Date().toISOString(), ...notif },
        ...prev,
      ]);
    } else {
      console.log(`🔕 Notification silently dropped — type: ${notif.type} — 24BCE0965 Raghava Reddy`);
    }
  };

  const updatePreferences_24BCE0965 = (newPreferences) => {
    setPreferences_raghavaReddy(newPreferences);
  };

  return (
    <NotifContext_24BCE0965.Provider
      value={{
        notifications: filteredNotifications_24BCE0965,
        allNotifications: notifications_raghavaReddy,
        unreadCount: unreadCount_24BCE0965,
        preferences: preferences_raghavaReddy,
        markAsRead_24BCE0965,
        markAllRead_24BCE0965,
        addNotification_24BCE0965,
        updatePreferences_24BCE0965,
      }}
    >
      {children}
    </NotifContext_24BCE0965.Provider>
  );
}
