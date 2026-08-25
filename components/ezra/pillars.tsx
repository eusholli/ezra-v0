import Link from 'next/link'

const pillars = [
  {
    number: '01',
    title: 'Determinism, not inference',
    body: 'The verification layer cannot itself be probabilistic. Same input, same answer, every time — and the answer is inspectable.',
    href: '/platform',
  },
  {
    number: '02',
    title: 'Blast radius over diff',
    body: 'A diff shows the lines that changed. It says nothing about the batch job or the settlement path downstream of them.',
    href: '/platform',
  },
  {
    number: '03',
    title: 'Built for brownfield',
    body: 'Forty years of accreted code, dead branches, and systems no one remaining wrote. That is the only place this matters.',
    href: '/platform',
  },
  {
    number: '04',
    title: 'Evidence for the control environment',
    body: 'Every computed change produces a record your change advisory board and your examiners can read.',
    href: '/trust',
  },
]

export function Pillars() {
  return (
    <section className="bg-tint py-18 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-xl border border-hairline bg-white p-7 shadow-card transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-blue-200"
            >
              <p className="font-mono text-sm text-blue-500">
                {pillar.number}
              </p>
              <h3 className="mt-4 text-xl font-medium leading-[1.3] text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-body">
                {pillar.body}
              </p>
              <Link
                href={pillar.href}
                className="mt-4 inline-block text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
