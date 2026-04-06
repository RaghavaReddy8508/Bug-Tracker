// ============================================================
// useDebounce — Custom Hook — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// ============================================================

import { useState, useEffect } from 'react';

export default function useDebounce_24BCE0965(value_raghavaReddy, delay_24BCE0965 = 300) {
  const [debouncedValue_raghavaReddy, setDebouncedValue_raghavaReddy] = useState(value_raghavaReddy);

  useEffect(() => {
    const timer_24BCE0965 = setTimeout(() => {
      setDebouncedValue_raghavaReddy(value_raghavaReddy);
    }, delay_24BCE0965);

    return () => clearTimeout(timer_24BCE0965);
  }, [value_raghavaReddy, delay_24BCE0965]);

  return debouncedValue_raghavaReddy;
}
