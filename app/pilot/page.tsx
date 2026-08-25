import { Footer } from '@/components/ezra/footer'
import { Nav } from '@/components/ezra/nav'

export default function PilotPage() {
  return (
    <main>
      <Nav />
      <section className="bg-canvas py-30">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
            Request pilot
          </p>
          <h1 className="mt-4 max-w-[680px] text-[36px] font-semibold leading-[1.1] tracking-[-0.022em] text-slate-900 lg:text-[56px] lg:leading-[1.05]">
            Three institutions. 2026.
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.6] text-slate-500">
            A 60–90 day read-only pilot on one team and one real regression
            suite. Exit criteria agreed before we start. Write to{' '}
            <a
              href="mailto:pilot@ezra.com"
              className="text-void underline underline-offset-4"
            >
              pilot@ezra.com
            </a>{' '}
            to begin.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
