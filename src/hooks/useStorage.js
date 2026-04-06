// ============================================================
// useStorage — Custom Hook — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// localStorage read/write custom hook
// ============================================================

import { useState, useEffect } from 'react';

export default function useStorage_24BCE0965(key_raghavaReddy, defaultValue_24BCE0965) {
  const [value_raghavaReddy, setValue_raghavaReddy] = useState(() => {
    try {
      const stored_24BCE0965 = localStorage.getItem(key_raghavaReddy);
      return stored_24BCE0965 ? JSON.parse(stored_24BCE0965) : defaultValue_24BCE0965;
    } catch (error_raghavaReddy) {
      console.error(`useStorage_24BCE0965 read error for key "${key_raghavaReddy}":`, error_raghavaReddy);
      return defaultValue_24BCE0965;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key_raghavaReddy, JSON.stringify(value_raghavaReddy));
    } catch (error_raghavaReddy) {
      console.error(`useStorage_24BCE0965 write error for key "${key_raghavaReddy}":`, error_raghavaReddy);
    }
  }, [key_raghavaReddy, value_raghavaReddy]);

  return [value_raghavaReddy, setValue_raghavaReddy];
}
