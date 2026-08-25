const fits = [
  '20+ year codebases',
  'Regulated change control',
  'Regression suites measured in hours',
  'Failure with financial or legal consequence',
]

const doesntFit = [
  'Greenfield projects',
  'Small codebases',
  'Teams shipping without a review gate',
  'Anyone who wants code written for them',
]

function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
      <path
        d="M2 6.5L4.8 9.2L10 3"
        fill="none"
        stroke="#0FA97C"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

function DashMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
      <path
        d="M2 6h8"
        fill="none"
        stroke="#7A8AA5"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function Audience() {
  return (
    <section className="bg-canvas py-18 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="max-w-[680px] text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.12]">
          Built for estates where a bad change is a regulatory event.
        </h2>

        <div className="mt-12 overflow-hidden rounded-xl border border-hairline bg-white shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-hairline">
            <div className="p-7 md:p-9">
              <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-green"
                />
                FITS
              </p>
              <ul className="mt-4 divide-y divide-hairline">
                {fits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-4 text-[15px] text-ink"
                  >
                    <CheckMark />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-hairline p-7 md:border-t-0 md:p-9">
              <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-muted-text"
                />
                DOESN&apos;T
              </p>
              <ul className="mt-4 divide-y divide-hairline">
                {doesntFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-4 text-[15px] text-body"
                  >
                    <DashMark />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
