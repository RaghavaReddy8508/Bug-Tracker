// ============================================================
// AppLayout — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Wraps sidebar + topbar + children
// ============================================================

import React from 'react';
import Sidebar_24BCE0965 from './Sidebar';

export default function AppLayout_24BCE0965({ children }) {
  return (
    <div className="app-shell" id="appLayout-24BCE0965">
      <Sidebar_24BCE0965 />
      <main className="main-area">
        {children}
      </main>
    </div>
  );
}
