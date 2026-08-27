import {
  PrototypePage,
  type PrototypeContent,
} from '@/components/ezra/prototype/prototype-page'

const content: PrototypeContent = {
  headline: 'Nothing you cannot take on.',
  subheading:
    'A thousand changes a day, from your people and from their models, on a system nobody has held in their head for years. Every one of them arrives with an answer already attached.',
  caption: 'SubscriptionRenewalService was not in the changed files.',
  points: [
    {
      title: 'Nothing hides.',
      body: 'SubscriptionRenewalService calls retry() directly and was never in the changed files. That is the class of thing that takes a bank down at 4am. Ezra found it because it understands the system, not the patch.',
    },
    {
      title: 'Volume stops being a threat.',
      body: 'Ten pull requests or ten thousand. What it costs you to answer does not scale with how many people are asking.',
    },
    {
      title: 'You still decide.',
      body: 'Every step is re-derivable by a third party. Ezra proposes and the person who answers for a production incident signs. The tool does not sign.',
    },
  ],
  impactMap: {
    resolvedTotal: 4200,
    estateTotal: 4200,
    ringImplicated: true,
    stats: {
      riskLabel: 'HIGH',
      riskSeverity: 'high',
      servicesHit: '4',
      relatedIncidents: '1 P1',
      inFlightPrs: '2 conflicts',
    },
    services: [
      {
        name: 'SubscriptionRenewalService',
        severity: 'high',
        reason: 'Calls retry() directly — not in changed files',
      },
      {
        name: 'RefundService',
        severity: 'med',
        reason: 'Inherits timeout config silently',
      },
      {
        name: 'InvoiceGenerator',
        severity: 'med',
        reason: 'Shares GatewayClient connection pool',
      },
      {
        name: 'WebhookDispatcher',
        severity: 'low',
        reason: 'Reads payment status events',
      },
    ],
    panelCaption: 'computed from 4,200 nodes · 11,830 edges · deterministic',
  },
}

export default function ControlPage() {
  return <PrototypePage content={content} />
}
