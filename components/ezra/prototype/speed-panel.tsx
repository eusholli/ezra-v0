'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { buildGraph } from '@/components/ezra/graph-data'

const RESOLVE_MS = 1500
const ELAPSED_TARGET = 1.4
const NODES_TARGET = 4200
const PANEL_CAPTION = 'computed from 4,200 nodes · 11,830 edges · deterministic'

export function SpeedPanel({ seed = 1337 }: { seed?: number }) {
  const graph = useMemo(() => buildGraph(seed), [seed])

  // Nodes ordered left-to-right so the resolve sweeps across the estate.
  const orderedIds = useMemo(
    () =>
      graph.nodes
        .slice()
        .sort((a, b) => a.x - b.x)
        .map((n) => n.id),
    [graph.nodes],
  )

  const [progress, setProgress] = useState(0) // 0 -> 1 across the sweep
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduced) {
      setProgress(1)
      return
    }

    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / RESOLVE_MS, 1)
      // Ease-out so the sweep decelerates as it settles.
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const revealedCount = Math.round(progress * orderedIds.length)
  const revealedSet = useMemo(() => {
    const s = new Set<number>()
    for (let i = 0; i < revealedCount; i++) s.add(orderedIds[i])
    return s
  }, [revealedCount, orderedIds])

  const nodesResolved = Math.round(progress * NODES_TARGET)
  const elapsed = (progress * ELAPSED_TARGET).toFixed(1)

  return (
    <div className="relative rounded-xl bg-deep shadow-hero">
      <div className="flex flex-col md:h-[460px] md:flex-row">
        <div className="relative order-2 md:order-1 md:w-[66%]">
          <svg
            viewBox={`0 0 ${graph.width} ${graph.height}`}
            className="h-[300px] w-full md:h-full"
            preserveAspectRatio="xMinYMid slice"
            role="img"
            aria-label="Dependency graph resolving left to right across the whole estate"
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
                fill = '#1E5EFF'
                radius = isRoot ? 3.2 : 1.8
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
              {nodesResolved.toLocaleString('en-US')}{' '}
              <span className="text-on-deep-muted">
                / {NODES_TARGET.toLocaleString('en-US')}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div className="col-span-1">
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                ELAPSED
              </p>
              <p className="mt-1 font-mono text-4xl leading-none text-cyan tabular-nums">
                {elapsed}s
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                SERVICES HIT
              </p>
              <p className="mt-1 font-mono text-sm text-on-deep">4</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                EDGES WALKED
              </p>
              <p className="mt-1 font-mono text-sm text-on-deep">11,830</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                ASKED
              </p>
              <p className="mt-1 font-mono text-sm text-on-deep">once</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-hairline-dark pt-4">
            <div>
              <p className="font-mono text-xs font-semibold text-on-deep">
                Last quarter
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-on-deep-muted">
                3 engineers · 4 days · one service missed
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold text-on-deep">
                This morning
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-on-deep-muted">
                Answered while sales was still talking
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline-dark px-6 py-4 md:px-7">
        <p className="font-mono text-xs text-on-deep-muted">{PANEL_CAPTION}</p>
      </div>
    </div>
  )
}
