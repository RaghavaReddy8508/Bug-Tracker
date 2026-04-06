// Bug Report Templates — 24BCE0965_L1_MP_RAGHAVA — Raghava Reddy
// Feature 11: Template definitions for Smart Bug Templates

export const bugTemplates_24BCE0965 = [
  {
    name: 'UI Bug',
    icon: '🎨',
    description: 'Visual glitches, layout issues, styling problems, or incorrect rendering.',
    defaultSeverity: 'medium',
    visibleFields: ['title', 'description', 'steps', 'browser', 'environment'],
    prefill: {
      steps_24BCE0965: '1. Navigate to the affected page\n2. Observe the visual issue\n3. Compare with expected design',
    },
  },
  {
    name: 'Performance Bug',
    icon: '⚡',
    description: 'Slow load times, lag, memory leaks, or unresponsive interactions.',
    defaultSeverity: 'high',
    visibleFields: ['title', 'description', 'steps', 'environment', 'expectedLoadTime'],
    prefill: {
      description_24BCE0965: 'Expected load time: ___ ms\nActual load time: ___ ms\n\nAffected page/feature: ',
    },
  },
  {
    name: 'Security Bug',
    icon: '🔒',
    description: 'Vulnerabilities, data exposure, auth bypass, or injection attacks.',
    defaultSeverity: 'critical',
    visibleFields: ['title', 'description', 'steps', 'affectedEndpoint', 'environment'],
    prefill: {
      severity_raghavaReddy: 'critical',
      description_24BCE0965: 'Vulnerability type: \nAffected endpoint: \nPotential impact: \nReproduction steps: ',
    },
  },
  {
    name: 'Crash / App Freeze',
    icon: '💥',
    description: 'Application crashes, freezes, or becomes completely unresponsive.',
    defaultSeverity: 'critical',
    visibleFields: ['title', 'description', 'steps', 'browser', 'environment', 'errorLogs'],
    prefill: {
      severity_raghavaReddy: 'critical',
      steps_24BCE0965: '1. Steps before crash:\n2. \n3. \n\nError message (if visible): \nConsole errors: ',
      environment_raghavaReddy: 'OS: \nDevice: \nRAM available: ',
    },
  },
  {
    name: 'Data Loss',
    icon: '💾',
    description: 'Data disappearing, corruption, failed saves, or sync issues.',
    defaultSeverity: 'critical',
    visibleFields: ['title', 'description', 'steps', 'environment', 'dataAffected'],
    prefill: {
      severity_raghavaReddy: 'critical',
      description_24BCE0965: 'Data affected: \nWas data recoverable: Yes / No\nLast known good state: \n\nTimeline of events: ',
    },
  },
];
