import {
  PrototypePage,
  type PrototypeContent,
} from '@/components/ezra/prototype/prototype-page'
import {
  DecisionQueuePanel,
  type DecisionQueuePanelConfig,
} from '@/components/ezra/prototype/decision-queue-panel'

const content: PrototypeContent = {
  headline: 'You were never the slow part.',
  subheading:
    'Ezra holds a living understanding of everything you own, so the finding out is already done. What reaches you is the decision itself, with what it touches sitting next to it. Merge it. Ship Friday. Promise the date. Decided in seconds, and decided with your eyes open.',
  caption: 'Nine of these were decided in March, by you, once.',
  points: [
    {
      title: 'You were never the slow part.',
      body: 'Four days on a question is not four days of judgment. It is three days and seven hours of finding out what the thing touches, then thirty seconds of deciding. Only the thirty seconds was ever yours.',
    },
    {
      title: 'Courage is a knowledge problem.',
      body: 'The move you are not making is not blocked by nerve. It is blocked by not knowing what it would touch. Nobody is bold about a system they cannot see, and nobody should be.',
    },
    {
      title: 'Decide once, and it holds.',
      body: 'The standard you set on one change is the standard applied to the next three thousand, at four in the morning, without you. What reaches you is what genuinely needs you. Whoever answers fastest, and is right, sets the direction. That was always true. It used to take a bigger team.',
    },
  ],
}

const panelConfig: DecisionQueuePanelConfig = {
  seed: 8888,
  queueLabel: "TODAY'S QUEUE",
  queueTotal: '11',
  stats: {
    clearedLabel: 'CLEARED BY YOUR STANDARD',
    clearedValue: '9',
    needsYouLabel: 'NEEDS YOU',
    needsYouValue: '2',
    timeLabel: 'TIME TO DECIDE',
    timeValue: '1.4s each',
  },
  rows: [
    {
      label: 'Merge PR 4471, the retry backoff change',
      reason:
        'Reaches SubscriptionRenewalService, which is not in the diff. Same service as the P1 in May.',
      tag: 'NEEDS YOU',
    },
    {
      label: 'Promise the integration for Friday',
      reason: 'Four services, two teams, and the schema step has no rollback.',
      tag: 'NEEDS YOU',
    },
    {
      label: 'Merge PR 4468, onboarding copy',
      reason: 'No behaviour reached. Your standard, set 14 March.',
      tag: 'CLEARED',
    },
    {
      label: 'Merge PR 4470, index on the events table',
      reason: 'Same shape as PR 3902, which you approved.',
      tag: 'CLEARED',
    },
    {
      label: 'Bump the parser dependency',
      reason: 'Nothing downstream of it changes behaviour.',
      tag: 'CLEARED',
    },
  ],
  panelCaption: 'computed from 4,200 nodes · 11,830 edges · deterministic',
}

export default function DecidePage() {
  return (
    <PrototypePage
      content={content}
      panel={<DecisionQueuePanel config={panelConfig} />}
    />
  )
}
