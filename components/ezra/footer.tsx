import Link from 'next/link'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Trust', href: '/trust' },
      { label: 'Pilot', href: '/pilot' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Subprocessors', href: '/subprocessors' },
      { label: 'Security disclosure', href: '/security' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'security@ezra.com', href: 'mailto:security@ezra.com' },
      { label: 'press@ezra.com', href: 'mailto:press@ezra.com' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-deep py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-mono text-[15px] font-semibold tracking-[0.14em] text-on-deep">
              EZRA
            </p>
            <p className="mt-3 max-w-[240px] text-sm leading-[1.6] text-on-deep-muted">
              Deterministic verification for AI-generated code.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-on-deep-muted">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-deep-muted hover:text-on-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-hairline-dark pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-on-deep-muted">
            © 2026 Ezra Intelligence
          </p>
          <Link
            href="/status"
            className="flex items-center gap-2 font-mono text-xs text-on-deep-muted hover:text-on-deep"
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-green"
            />
            Status →
          </Link>
        </div>
      </div>
    </footer>
  )
}
