const TOTAL_ASSERTIONS = 4200
const AFFECTED_ASSERTIONS = 96
const AFFECTED_PCT = (AFFECTED_ASSERTIONS / TOTAL_ASSERTIONS) * 100

export function Problem() {
  return (
    <section className="bg-tint py-18 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-blue-500">
              THE REDISCOVERY TAX
            </p>
            <h2 className="mt-4 text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.12]">
              AI writes in seconds. Verifying it takes weeks.
            </h2>
            <p className="mt-5 max-w-[500px] text-base leading-[1.65] text-body">
              Every change to a 40-year estate triggers the same question,
              and every team answers it the same way: run everything. The
              diff is knowable. What the diff reaches is not.
            </p>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="h-fit rounded-xl border border-hairline bg-white p-7 shadow-card">
              <p className="font-mono text-[56px] leading-none text-ink md:text-[64px]">
                41 min
              </p>
              <p className="mt-3 font-mono text-[13px] tracking-[0.04em] text-muted-text">
                AVERAGE FULL-SUITE REGRESSION RUN
              </p>
              <div className="mt-5 border-t border-hairline pt-5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-hairline">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${AFFECTED_PCT}%` }}
                  />
                </div>
                <p className="mt-3 text-[13px] leading-[1.5] text-muted-text">
                  <span className="font-mono text-ink">
                    {AFFECTED_ASSERTIONS}
                  </span>{' '}
                  of {TOTAL_ASSERTIONS.toLocaleString('en-US')} assertions —{' '}
                  <span className="text-blue-500">
                    96 actually affected
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
