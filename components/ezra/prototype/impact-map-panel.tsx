'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { buildGraph } from '@/components/ezra/graph-data'
import { cn } from '@/lib/utils'

const BATCH_SIZE = 7
const STEP_MS = 90

type Severity = 'high' | 'med' | 'low'

export type ImpactMapService = {
  name: string
  severity: Severity
  reason: string
}

export type ImpactMapConfig = {
  /** Seed for the deterministic blast-radius graph. Changing it re-shapes the map. */
  seed?: number
  /** Running "nodes resolved" counter target. */
  resolvedTotal: number
  /** Total nodes in the estate. */
  estateTotal: number
  /** Top-line stat grid. */
  stats: {
    riskLabel: string
    riskSeverity: Severity
    servicesHit: string
    relatedIncidents: string
    inFlightPrs: string
  }
  /** Services listed inside the settled panel. */
  services: ImpactMapService[]
  /** Footer line inside the dark panel. */
  panelCaption: string
  /**
   * When true, draw a thin ring around the implicated graph nodes (one per
   * listed service), each in that service's severity colour, so the eye can
   * find them against the full system.
   */
  ringImplicated?: boolean
}

const severityChip: Record<Severity, string> = {
  high: 'bg-crimson text-white',
  med: 'bg-amber text-deep',
  low: 'bg-cyan text-deep',
}

const severityStroke: Record<Severity, string> = {
  high: '#e8092e',
  med: '#ff8a00',
  low: '#00c2d7',
}

export function ImpactMapPanel({ config }: { config: ImpactMapConfig }) {
  const graph = useMemo(() => buildGraph(config.seed ?? 1337), [config.seed])
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
      config.resolvedTotal,
  )
  const revealedSet = useMemo(() => {
    const s = new Set<number>()
    for (let i = 0; i < revealed; i++) s.add(graph.nodes[i].id)
    return s
  }, [revealed, graph.nodes])

  // One ring per listed service, mapped onto the graph's emphasis nodes
  // (crimson first, then amber), each stroked in the service's severity colour.
  const ringTargets = useMemo(() => {
    if (!config.ringImplicated) return []
    const emphasis = [
      ...graph.nodes.filter((n) => n.severity === 'crimson'),
      ...graph.nodes.filter((n) => n.severity === 'amber'),
    ]
    return config.services
      .map((service, i) => {
        const node = emphasis[i]
        if (!node) return null
        return { node, color: severityStroke[service.severity] }
      })
      .filter((t): t is { node: (typeof emphasis)[number]; color: string } =>
        Boolean(t),
      )
  }, [config.ringImplicated, config.services, graph.nodes])

  return (
    <div className="relative rounded-xl bg-deep shadow-hero">
      <div className="flex flex-col md:h-[460px] md:flex-row">
        <div className="relative order-2 md:order-1 md:w-[66%]">
          <svg
            viewBox={`0 0 ${graph.width} ${graph.height}`}
            className="h-[300px] w-full md:h-full"
            preserveAspectRatio="xMinYMid slice"
            role="img"
            aria-label="Dependency graph showing computed blast radius propagating from a changed node across the system"
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
            {ringTargets.map(({ node, color }) => {
              const active = revealedSet.has(node.id)
              return (
                <circle
                  key={`ring-${node.id}`}
                  cx={node.x}
                  cy={node.y}
                  r={6}
                  fill="none"
                  stroke={color}
                  strokeWidth={0.9}
                  className="transition-opacity duration-500"
                  opacity={active && settled ? 0.9 : 0}
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
                / {config.estateTotal.toLocaleString('en-US')}
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
                <span
                  className={cn(
                    'mt-1 inline-block rounded-md px-2 py-0.5 font-mono text-sm',
                    severityChip[config.stats.riskSeverity],
                  )}
                >
                  {config.stats.riskLabel}
                </span>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                  SERVICES HIT
                </p>
                <p className="mt-1 font-mono text-sm text-on-deep">
                  {config.stats.servicesHit}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                  RELATED INCIDENTS
                </p>
                <p className="mt-1 font-mono text-sm text-on-deep">
                  {config.stats.relatedIncidents}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                  IN-FLIGHT PRS
                </p>
                <p className="mt-1 font-mono text-sm text-on-deep">
                  {config.stats.inFlightPrs}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 border-t border-hairline-dark pt-3">
              {config.services.map((service) => (
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
          {config.panelCaption}
        </p>
      </div>
    </div>
  )
}
