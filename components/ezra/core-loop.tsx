function ObserveIcon() {
  return (
    <svg viewBox="0 0 56 40" className="h-10 w-14" aria-hidden="true">
      <rect
        x="4"
        y="8"
        width="30"
        height="22"
        rx="3"
        fill="none"
        stroke="#A9C6FF"
        strokeWidth="1.5"
      />
      <path d="M10 15h18M10 20h14M10 25h10" stroke="#A9C6FF" strokeWidth="1.5" />
      <circle cx="44" cy="19" r="7" fill="none" stroke="#1E5EFF" strokeWidth="1.5" />
      <path d="M44 15v4l3 2" stroke="#1E5EFF" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function OrientIcon() {
  return (
    <svg viewBox="0 0 56 40" className="h-10 w-14" aria-hidden="true">
      <circle cx="14" cy="20" r="3" fill="#1E5EFF" />
      <circle cx="34" cy="9" r="2" fill="#A9C6FF" />
      <circle cx="42" cy="20" r="2" fill="#A9C6FF" />
      <circle cx="34" cy="31" r="2" fill="#A9C6FF" />
      <circle cx="50" cy="10" r="2" fill="#A9C6FF" />
      <path
        d="M14 20L34 9M14 20L42 20M14 20L34 31M34 9L50 10"
        stroke="#A9C6FF"
        strokeWidth="1"
      />
    </svg>
  )
}

function DecideIcon() {
  return (
    <svg viewBox="0 0 56 40" className="h-10 w-14" aria-hidden="true">
      <rect
        x="4"
        y="6"
        width="48"
        height="28"
        rx="3"
        fill="none"
        stroke="#A9C6FF"
        strokeWidth="1.5"
      />
      <path d="M11 15h14M11 20h9" stroke="#A9C6FF" strokeWidth="1.5" />
      <rect x="30" y="12" width="16" height="16" rx="2" fill="#EEF4FF" stroke="#1E5EFF" strokeWidth="1.5" />
      <path d="M35 20l3 3 6-6" stroke="#1E5EFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ActIcon() {
  return (
    <svg viewBox="0 0 56 40" className="h-10 w-14" aria-hidden="true">
      <circle cx="18" cy="20" r="10" fill="none" stroke="#A9C6FF" strokeWidth="1.5" />
      <circle cx="18" cy="20" r="3" fill="#1E5EFF" />
      <path d="M28 20h20" stroke="#1E5EFF" strokeWidth="1.5" />
      <path d="M44 15l6 5-6 5" stroke="#1E5EFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const steps = [
  {
    number: '01',
    title: 'Observe',
    body: 'A pull request lands in your existing pipeline.',
    Icon: ObserveIcon,
  },
  {
    number: '02',
    title: 'Orient',
    body: 'Ezra computes the blast radius across the whole system.',
    Icon: OrientIcon,
  },
  {
    number: '03',
    title: 'Decide',
    body: 'Your reviewers see only the paths the change can reach.',
    Icon: DecideIcon,
  },
  {
    number: '04',
    title: 'Act',
    body: 'Merge, with a record of what was tested and why.',
    Icon: ActIcon,
  },
]

export function CoreLoop() {
  return (
    <section className="bg-canvas py-18 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.1em] text-blue-500">
          THE LOOP, RESTORED
        </p>
        <h2 className="mx-auto mt-4 max-w-[680px] text-balance text-center text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.12]">
          Four steps. Every one of them computed.
        </h2>

        {/* Future mount point: Sticky Scroll Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-xl border border-hairline bg-white p-6 shadow-card transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-blue-200"
            >
              <step.Icon />
              <p className="mt-5 font-mono text-sm text-blue-500">
                {step.number}
              </p>
              <p className="mt-2 text-xl font-medium text-ink">
                {step.title}
              </p>
              <p className="mt-2 text-[15px] leading-[1.6] text-body">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
