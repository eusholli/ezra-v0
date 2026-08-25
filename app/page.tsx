import { Audience } from '@/components/ezra/audience'
import { CoreLoop } from '@/components/ezra/core-loop'
import { FinalCta } from '@/components/ezra/final-cta'
import { Footer } from '@/components/ezra/footer'
import { Hero } from '@/components/ezra/hero'
import { Nav } from '@/components/ezra/nav'
import { Pillars } from '@/components/ezra/pillars'
import { Problem } from '@/components/ezra/problem'
import { TheNumber } from '@/components/ezra/the-number'
import { TrustStrip } from '@/components/ezra/trust-strip'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <Problem />
      <CoreLoop />
      <TheNumber />
      <Pillars />
      <Audience />
      <FinalCta />
      <Footer />
    </main>
  )
}
