import {
  PrototypePage,
  type PrototypeContent,
} from '@/components/ezra/prototype/prototype-page'
import { SpeedPanel } from '@/components/ezra/prototype/speed-panel'

const content: PrototypeContent = {
  headline: 'Now the machine keeps up with you.',
  subheading:
    'Ezra holds a living understanding of everything you own, so the answer arrives at the speed of the question. Ask what a change touches, what it costs, what it puts at risk. You set the pace now.',
  caption: 'The same question that took four days last quarter.',
  points: [
    {
      title: 'You answer in the meeting, not after it.',
      body: 'The value is not that the answer is good. You could always get a good answer eventually. The value is that it arrives while the decision is still open.',
    },
    {
      title: 'The question does not have to be about code that exists.',
      body: 'What would this feature touch, what would it cost, where would it hurt. A standing understanding of the system answers before anything is written, not only after the diff lands.',
    },
    {
      title: 'Every model release makes you faster too.',
      body: 'Each new model lands on a codebase Ezra already understands, so the gain arrives on your legacy estate instead of starting from zero. The rediscovery tax is removed.',
    },
  ],
}

export default function SpeedPage() {
  return <PrototypePage content={content} panel={<SpeedPanel />} />
}
