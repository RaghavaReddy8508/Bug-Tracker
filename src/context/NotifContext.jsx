// ============================================================
// NotifContext — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================

import React, { createContext, useState, useEffect } from 'react';
import { seedNotifications_24BCE0965 } from '../data/seed';

export const NotifContext_24BCE0965 = createContext(null);

export function NotifProvider_24BCE0965({ children }) {
  const [notifications_raghavaReddy, setNotifications_raghavaReddy] = useState(() => {
    const stored = localStorage.getItem('bugtrackr_notifs_24BCE0965');
    return stored ? JSON.parse(stored) : seedNotifications_24BCE0965;
  });

  const unreadCount_24BCE0965 = notifications_raghavaReddy.filter((n) => !n.read).length;

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
    setNotifications_raghavaReddy((prev) => [
      { id: `notif_${Date.now()}`, read: false, at: new Date().toISOString(), ...notif },
      ...prev,
    ]);
  };

  return (
    <NotifContext_24BCE0965.Provider
      value={{
        notifications: notifications_raghavaReddy,
        unreadCount: unreadCount_24BCE0965,
        markAsRead_24BCE0965,
        markAllRead_24BCE0965,
        addNotification_24BCE0965,
      }}
    >
      {children}
    </NotifContext_24BCE0965.Provider>
  );
}
