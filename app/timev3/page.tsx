import {
  PrototypePage,
  type PrototypeContent,
} from '@/components/ezra/prototype/prototype-page'
import {
  TimePanel,
  type TimePanelConfig,
} from '@/components/ezra/prototype/time-panel'

const content: PrototypeContent = {
  headline: 'The time you never thought you would get back.',
  subheading:
    'Not more hours for keeping up. Hours for the work you took this job to do.',
  caption: 'Multiply that by three thousand changes a quarter.',
  points: [
    {
      title: 'Time is the only thing AI did not multiply.',
      body: 'It multiplied production, review load, expectation and scrutiny. The one input it left untouched is the hours of the person who has to answer for all of it.',
    },
    {
      title: 'The hours come back in a shape you can spend.',
      body: 'Not five minutes here and ten there. Whole days off the archaeology, off the 11pm verification session, off the weekend before a release.',
    },
    {
      title: 'What you do with them is yours.',
      body: 'Ezra has no opinion about it. A tool that returns your time and then tells you how to spend it has not returned it.',
    },
  ],
}

const panelConfig: TimePanelConfig = {
  seed: 8888,
  answerLabel: 'THIS CHANGE, ANSWERED',
  answerValue: '1.4s',
  stats: [
    { label: 'CHANGES THIS QUARTER', value: '3,180' },
    { label: 'HAND-ANSWERED BEFORE', value: '~11%' },
    { label: 'ENGINEER-DAYS RETURNED', value: '142' },
    { label: 'SPENT ON', value: 'yours' },
  ],
  before: {
    label: 'BEFORE',
    value: '3 engineers · 4 days',
    note: 'And it still missed SubscriptionRenewalService, because nobody thought to look outside the diff.',
  },
  now: {
    label: 'NOW',
    value: '1.4 seconds',
    note: 'Same question. Same codebase. Four services found, including the one outside the diff.',
  },
}

export default function TimeV3Page() {
  return (
    <PrototypePage content={content} panel={<TimePanel config={panelConfig} />} />
  )
}
