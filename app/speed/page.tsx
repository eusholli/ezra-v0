import {
  PrototypePage,
  type PrototypeContent,
} from '@/components/ezra/prototype/prototype-page'

const content: PrototypeContent = {
  headline: 'Placeholder headline for the speed page.',
  subheading:
    'Placeholder subheading for the speed page. One or two sentences that sit directly beneath the headline.',
  caption: 'placeholder caption · monospace · muted',
  points: [
    {
      title: 'Placeholder point one',
      body: 'Placeholder paragraph for the first point. One short paragraph of body copy.',
    },
    {
      title: 'Placeholder point two',
      body: 'Placeholder paragraph for the second point. One short paragraph of body copy.',
    },
    {
      title: 'Placeholder point three',
      body: 'Placeholder paragraph for the third point. One short paragraph of body copy.',
    },
  ],
  impactMap: {
    seed: 1337,
    resolvedTotal: 1284,
    estateTotal: 4200,
    stats: {
      riskLabel: 'HIGH',
      riskSeverity: 'high',
      servicesHit: '4',
      relatedIncidents: '1 P1',
      inFlightPrs: '2 conflicts',
    },
    services: [
      {
        name: 'PlaceholderServiceA',
        severity: 'high',
        reason: 'Placeholder reason line.',
      },
      {
        name: 'PlaceholderServiceB',
        severity: 'med',
        reason: 'Placeholder reason line.',
      },
      {
        name: 'PlaceholderServiceC',
        severity: 'med',
        reason: 'Placeholder reason line.',
      },
      {
        name: 'PlaceholderServiceD',
        severity: 'low',
        reason: 'Placeholder reason line.',
      },
    ],
    panelCaption: 'computed from 4,200 nodes · 11,830 edges · deterministic',
  },
}

export default function SpeedPage() {
  return <PrototypePage content={content} />
}
