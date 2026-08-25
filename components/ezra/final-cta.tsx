import { EzraButton } from '@/components/ezra/ezra-button'

export function FinalCta() {
  return (
    <section className="bg-tint-deep py-20 text-center md:py-[160px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-blue-500">
          PILOT PROGRAMME
        </p>
        <h2 className="mx-auto mt-4 max-w-[680px] text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.12]">
          Three institutions. 2026.
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-base leading-[1.65] text-body">
          A 60–90 day read-only pilot on one team and one real regression
          suite. Exit criteria agreed before we start.
        </p>
        <div className="mt-8 flex justify-center">
          <EzraButton href="/pilot" variant="primary">
            Request pilot
          </EzraButton>
        </div>
        <p className="mt-5 text-[13px] text-muted-text">
          We reply within two business days.
        </p>
      </div>
    </section>
  )
}
