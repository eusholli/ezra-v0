'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { EzraButton } from '@/components/ezra/ezra-button'
import { buildGraph } from '@/components/ezra/graph-data'
import { cn } from '@/lib/utils'

const BATCH_SIZE = 7
const STEP_MS = 90
const TOTAL_RESOLVED = 1284
const TOTAL_ESTATE = 4200

const services = [
  {
    name: 'SubscriptionRenewalService',
    severity: 'high' as const,
    reason: 'Calls retry() directly — not in changed files',
  },
  {
    name: 'RefundService',
    severity: 'med' as const,
    reason: 'Inherits timeout config silently',
  },
  {
    name: 'InvoiceGenerator',
    severity: 'med' as const,
    reason: 'Shares GatewayClient connection pool',
  },
  {
    name: 'WebhookDispatcher',
    severity: 'low' as const,
    reason: 'Reads payment status events',
  },
]

const severityChip: Record<'high' | 'med' | 'low', string> = {
  high: 'bg-crimson text-white',
  med: 'bg-amber text-deep',
  low: 'bg-cyan text-deep',
}

export function Hero() {
  const graph = useMemo(() => buildGraph(), [])
  const [revealed, setRevealed] = useState(0)
  const [settled, setSettled] = useState(false)
  const reducedRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    reducedRef.current = reduced

    if (reduced) {
      setRevealed(graph.nodes.length)
      setSettled(true)
      return
    }

    const totalBatches = Math.ceil((graph.nodes.length - 1) / BATCH_SIZE)
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(
      setTimeout(() => {
        setRevealed(1)
        for (let step = 1; step <= totalBatches; step++) {
          const count = Math.min(1 + step * BATCH_SIZE, graph.nodes.length)
          timers.push(
            setTimeout(() => {
              setRevealed(count)
              if (count === graph.nodes.length) {
                timers.push(setTimeout(() => setSettled(true), 200))
              }
            }, step * STEP_MS),
          )
        }
      }, 150),
    )

    return () => timers.forEach(clearTimeout)
  }, [graph.nodes.length])

  const resolvedCount = Math.round(
    (Math.min(revealed, graph.nodes.length) / graph.nodes.length) *
      TOTAL_RESOLVED,
  )
  const revealedSet = useMemo(() => {
    const s = new Set<number>()
    for (let i = 0; i < revealed; i++) s.add(graph.nodes[i].id)
    return s
  }, [revealed, graph.nodes])

  return (
    <section className="relative overflow-hidden bg-canvas pt-24 md:pt-[140px]">
      <div
        aria-hidden="true"
        className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-[640px]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="max-w-[640px] animate-fade-up">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-blue-500">
            DETERMINISTIC VERIFICATION
          </p>
          <h1 className="mt-5 text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-[60px] md:leading-[1.03] md:tracking-[-0.03em]">
            Ship AI code you can prove.
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-[1.55] text-body md:text-xl">
            Ezra computes the full blast radius of every change across your
            system. Deterministic. Repeatable. Evidence you can hand to an
            auditor.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <EzraButton href="/pilot" variant="primary">
              Request pilot
            </EzraButton>
            <EzraButton href="/platform" variant="secondary">
              See the platform
            </EzraButton>
          </div>
        </div>

        <div
          className="animate-fade-up relative mt-16 rounded-xl bg-deep shadow-hero md:mt-20"
          style={{ animationDelay: '120ms' }}
        >
          <div className="flex flex-col md:h-[460px] md:flex-row">
            <div className="relative order-2 md:order-1 md:w-[66%]">
              <svg
                viewBox={`0 0 ${graph.width} ${graph.height}`}
                className="h-[300px] w-full md:h-full"
                preserveAspectRatio="xMinYMid slice"
                role="img"
                aria-label="Dependency graph showing computed blast radius propagating from a changed node across the system, with four services elevated to warning severity and one to critical severity"
              >
                {graph.edges.map((edge) => {
                  const fromNode = graph.nodes[edge.from]
                  const toNode = graph.nodes[edge.to]
                  const active = revealedSet.has(toNode.id)
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={active ? '#1E5EFF' : '#223559'}
                      strokeWidth={active ? 0.75 : 0.5}
                      opacity={active ? 0.7 : 1}
                    />
                  )
                })}
                {graph.nodes.map((node) => {
                  const active = revealedSet.has(node.id)
                  const isRoot = node.id === graph.rootId
                  let fill = '#223559'
                  let radius = 1.6
                  if (active) {
                    if (node.severity === 'crimson') {
                      fill = '#E8092E'
                      radius = 3.2
                    } else if (node.severity === 'amber') {
                      fill = '#FF8A00'
                      radius = 2.6
                    } else {
                      fill = '#1E5EFF'
                      radius = isRoot ? 3.2 : 1.8
                    }
                  }
                  return (
                    <circle
                      key={node.id}
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={fill}
                    />
                  )
                })}
              </svg>
            </div>

            <div className="order-1 flex flex-col justify-between gap-6 border-b border-hairline-dark p-6 md:order-2 md:w-[34%] md:border-b-0 md:border-l md:p-7">
              <div>
                <p className="font-mono text-xs tracking-[0.08em] text-on-deep-muted">
                  NODES RESOLVED
                </p>
                <p className="mt-1 font-mono text-2xl text-on-deep">
                  {resolvedCount.toLocaleString('en-US')}{' '}
                  <span className="text-on-deep-muted">
                    / {TOTAL_ESTATE.toLocaleString('en-US')}
                  </span>
                </p>
              </div>

              <div
                className={cn(
                  'rounded-lg bg-deep-raised p-4 transition-opacity duration-500',
                  settled ? 'opacity-100' : 'opacity-0',
                )}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                      RISK
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-crimson px-2 py-0.5 font-mono text-sm text-white">
                      HIGH
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                      SERVICES HIT
                    </p>
                    <p className="mt-1 font-mono text-sm text-on-deep">4</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                      RELATED INCIDENTS
                    </p>
                    <p className="mt-1 font-mono text-sm text-on-deep">1 P1</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                      IN-FLIGHT PRS
                    </p>
                    <p className="mt-1 font-mono text-sm text-on-deep">
                      2 conflicts
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-hairline-dark pt-3">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-mono text-xs text-on-deep">
                          {service.name}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-on-deep-muted">
                          {service.reason}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase',
                          severityChip[service.severity],
                        )}
                      >
                        {service.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-hairline-dark px-6 py-4 md:px-7">
            <p className="font-mono text-xs text-on-deep-muted">
              computed from 4,200 nodes · 11,830 edges · deterministic
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
