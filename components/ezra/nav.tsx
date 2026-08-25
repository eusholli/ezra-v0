'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { EzraButton } from '@/components/ezra/ezra-button'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Platform', href: '/platform' },
  { label: 'Trust', href: '/trust' },
  { label: 'Insights', href: '/insights' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-[60px] bg-white/88 backdrop-blur-md transition-shadow',
        scrolled ? 'border-b border-hairline' : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-mono text-[15px] font-semibold tracking-[0.14em] text-ink"
        >
          EZRA
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-body transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-blue-500 hover:text-blue-600 sm:inline"
          >
            Sign in
          </Link>
          <EzraButton
            href="/pilot"
            variant="primary"
            className="h-9 px-4 text-sm"
          >
            Request pilot
          </EzraButton>
        </div>
      </nav>
    </header>
  )
}
