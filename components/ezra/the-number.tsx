'use client'

import { useEffect, useRef, useState } from 'react'

export function TheNumber() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(48)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered) {
          setTriggered(true)
          if (reduced) {
            setCount(2)
            return
          }
          const steps = [48, 34, 21, 9, 2]
          steps.forEach((value, i) => {
            setTimeout(() => setCount(value), (i * 800) / steps.length)
          })
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  return (
    <section ref={ref} className="bg-deep py-18 md:py-[140px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center justify-center gap-10 text-center md:flex-row md:gap-16">
          <div>
            <p className="font-mono text-[56px] leading-none text-on-deep-muted md:text-[88px]">
              48
            </p>
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-on-deep-muted">
              FULL REGRESSION SUITE
            </p>
            <hr className="mx-auto my-4 w-16 border-hairline-dark" />
            <p className="text-[13px] text-on-deep-muted">
              41 min · 4,200 assertions
            </p>
          </div>

          <p
            aria-hidden="true"
            className="rotate-90 font-mono text-3xl text-blue-400 md:rotate-0"
          >
            →
          </p>

          {/* Future mount point: Split Flap Display */}
          <div>
            <p className="font-mono text-[56px] leading-none text-white md:text-[88px]">
              {count}
            </p>
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-on-deep-muted">
              AFFECTED BY THIS PR
            </p>
            <hr className="mx-auto my-4 w-16 border-hairline-dark" />
            <p className="text-[13px] text-on-deep-muted">
              1.4 min · 96 assertions
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-[13px] text-on-deep-muted">
          Same coverage. Computed, not sampled.
        </p>
      </div>
    </section>
  )
}
