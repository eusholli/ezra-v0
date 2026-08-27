import { EzraButton } from '@/components/ezra/ezra-button'
import { Footer } from '@/components/ezra/footer'
import { Nav } from '@/components/ezra/nav'
import {
  ImpactMapPanel,
  type ImpactMapConfig,
} from '@/components/ezra/prototype/impact-map-panel'

export type PrototypePoint = {
  title: string
  body: string
}

export type PrototypeContent = {
  headline: string
  subheading: string
  /** Small monospace muted caption directly under the impact-map panel. */
  caption: string
  /** Exactly three points, laid out as three equal columns on desktop. */
  points: [PrototypePoint, PrototypePoint, PrototypePoint]
  impactMap: ImpactMapConfig
}

export function PrototypePage({ content }: { content: PrototypeContent }) {
  return (
    <main>
      <Nav />

      {/* 2. Hero: headline, subheading, then full-width impact-map panel */}
      <section className="bg-canvas pt-24 md:pt-[140px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[720px]">
            <h1 className="text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-[60px] md:leading-[1.03] md:tracking-[-0.03em] text-balance">
              {content.headline}
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-[1.55] text-body md:text-xl text-pretty">
              {content.subheading}
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            <ImpactMapPanel config={content.impactMap} />
          </div>

          {/* 3. Caption line directly under the panel */}
          <p className="mt-4 font-mono text-xs text-muted-text">
            {content.caption}
          </p>
        </div>
      </section>

      {/* 4. Three points */}
      <section className="bg-canvas py-18 md:py-[120px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {content.points.map((point) => (
              <div key={point.title}>
                <h2 className="text-xl font-semibold leading-[1.3] text-ink">
                  {point.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-body text-pretty">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quiet strip */}
      <section className="border-y border-hairline bg-canvas py-16">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="font-mono text-[13px] text-muted-text">
            Read-only. Attached to the pipeline you already run. Live in days.
          </p>
        </div>
      </section>

      {/* 6. Single call to action (identical on all three pages) */}
      <section className="bg-tint-deep py-20 text-center md:py-[160px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mx-auto max-w-[680px] text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.12]">
            Run it on your own codebase.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-base leading-[1.65] text-body">
            One team, one regression suite, read-only access, sixty days.
          </p>
          <div className="mt-8 flex justify-center">
            <EzraButton href="/pilot" variant="primary">
              Book a scoping call.
            </EzraButton>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  )
}
