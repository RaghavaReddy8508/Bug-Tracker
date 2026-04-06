// ============================================================
// AppLayout — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Feature 9: Focus Mode — conditional layout switch
// ============================================================

import React, { useState } from 'react';
import Sidebar_24BCE0965 from './Sidebar';
import FocusView_24BCE0965 from './FocusView';

export default function AppLayout_24BCE0965({ children }) {
  const [focusMode_raghavaReddy, setFocusMode_raghavaReddy] = useState(false);

  // Feature 9: Focus Mode toggle
  if (focusMode_raghavaReddy) {
    return <FocusView_24BCE0965 onExit_24BCE0965={() => setFocusMode_raghavaReddy(false)} />;
  }

  return (
    <div className="app-shell" id="appLayout-24BCE0965">
      <Sidebar_24BCE0965 onFocusMode_24BCE0965={() => setFocusMode_raghavaReddy(true)} />
      <main className="main-area">
        {children}
      </main>
    </div>
  );
}
