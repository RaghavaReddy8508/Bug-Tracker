// ============================================================
// useFilter — Custom Hook — 24BCE0965_L1_MP_RAGHAVA
// Developer: Raghava Reddy Mallidi (24BCE0965)
// Reusable filter logic
// ============================================================

import { useReducer, useMemo } from 'react';

const filterReducer_24BCE0965 = (state_raghavaReddy, action_24BCE0965) => {
  switch (action_24BCE0965.type) {
    case 'SET_STATUS':
      return { ...state_raghavaReddy, status: action_24BCE0965.payload };
    case 'SET_SEVERITY':
      return { ...state_raghavaReddy, severity: action_24BCE0965.payload };
    case 'SET_PROJECT':
      return { ...state_raghavaReddy, project: action_24BCE0965.payload };
    case 'SET_ASSIGNEE':
      return { ...state_raghavaReddy, assignee: action_24BCE0965.payload };
    case 'SET_SEARCH':
      return { ...state_raghavaReddy, search: action_24BCE0965.payload };
    case 'RESET':
      return { status: '', severity: '', project: '', assignee: '', search: '' };
    default:
      return state_raghavaReddy;
  }
};

export default function useFilter_24BCE0965(items_raghavaReddy) {
  const [filters_raghavaReddy, dispatch_24BCE0965] = useReducer(filterReducer_24BCE0965, {
    status: '',
    severity: '',
    project: '',
    assignee: '',
    search: '',
  });

  const filteredItems_raghavaReddy = useMemo(() => {
    return items_raghavaReddy.filter((item_24BCE0965) => {
      if (filters_raghavaReddy.status && item_24BCE0965.status !== filters_raghavaReddy.status)
        return false;
      if (filters_raghavaReddy.severity && item_24BCE0965.severity !== filters_raghavaReddy.severity)
        return false;
      if (filters_raghavaReddy.project && item_24BCE0965.project !== filters_raghavaReddy.project)
        return false;
      if (filters_raghavaReddy.assignee && item_24BCE0965.assignee !== filters_raghavaReddy.assignee)
        return false;
      if (filters_raghavaReddy.search) {
        const searchLower_24BCE0965 = filters_raghavaReddy.search.toLowerCase();
        const title_raghavaReddy = item_24BCE0965.title_raghavaReddy || '';
        const desc = item_24BCE0965.description || '';
        if (
          !title_raghavaReddy.toLowerCase().includes(searchLower_24BCE0965) &&
          !desc.toLowerCase().includes(searchLower_24BCE0965)
        )
          return false;
      }
      return true;
    });
  }, [items_raghavaReddy, filters_raghavaReddy]);

  return { filters_raghavaReddy, dispatch_24BCE0965, filteredItems_raghavaReddy };
}
