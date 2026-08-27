import { useMemo } from 'react'

import { buildGraph } from '@/components/ezra/graph-data'

type Stat = {
  label: string
  value: string
}

export type TimePanelConfig = {
  /** Seed for the deterministic blast-radius graph. */
  seed?: number
  /** Label above the promoted answer time. */
  answerLabel: string
  /** Promoted answer time, e.g. "1.4s". */
  answerValue: string
  /** Exactly four cells for the stat grid. */
  stats: [Stat, Stat, Stat, Stat]
  /** Footer band: the "before" state. */
  before: {
    label: string
    value: string
    note: string
  }
  /** Footer band: the "now" state. */
  now: {
    label: string
    value: string
    note: string
  }
}

export function TimePanel({ config }: { config: TimePanelConfig }) {
  const graph = useMemo(() => buildGraph(config.seed ?? 1337), [config.seed])

  return (
    <div className="relative rounded-xl bg-deep shadow-hero">
      <div className="flex flex-col md:h-[460px] md:flex-row">
        <div className="relative order-2 md:order-1 md:w-[66%]">
          <svg
            viewBox={`0 0 ${graph.width} ${graph.height}`}
            className="h-[300px] w-full md:h-full"
            preserveAspectRatio="xMinYMid slice"
            role="img"
            aria-label="Dependency graph, fully resolved and at rest, dimmed"
          >
            {/* Graph rendered at rest, fully resolved, dimmed to ~45%. */}
            <g opacity={0.45}>
              {graph.edges.map((edge) => {
                const fromNode = graph.nodes[edge.from]
                const toNode = graph.nodes[edge.to]
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#1E5EFF"
                    strokeWidth={0.75}
                    opacity={0.7}
                  />
                )
              })}
              {graph.nodes.map((node) => {
                const isRoot = node.id === graph.rootId
                let fill = '#1E5EFF'
                let radius = isRoot ? 3.2 : 1.8
                if (node.severity === 'crimson') {
                  fill = '#E8092E'
                  radius = 3.2
                } else if (node.severity === 'amber') {
                  fill = '#FF8A00'
                  radius = 2.6
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
            </g>
          </svg>
        </div>

        <div className="order-1 flex flex-col justify-between gap-6 border-b border-hairline-dark p-6 md:order-2 md:w-[34%] md:border-b-0 md:border-l md:p-7">
          <div>
            <p className="font-mono text-xs tracking-[0.08em] text-on-deep-muted">
              {config.answerLabel}
            </p>
            <p className="mt-1 font-mono text-4xl text-cyan">
              {config.answerValue}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {config.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                  {stat.label}
                </p>
                <p className="mt-1 font-mono text-sm text-on-deep">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-hairline-dark">
        <div className="border-r border-hairline-dark px-6 py-5 md:px-7">
          <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
            {config.before.label}
          </p>
          <p className="mt-1 font-mono text-base text-crimson">
            {config.before.value}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-on-deep-muted">
            {config.before.note}
          </p>
        </div>
        <div className="px-6 py-5 md:px-7">
          <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
            {config.now.label}
          </p>
          <p className="mt-1 font-mono text-base text-cyan">
            {config.now.value}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-on-deep-muted">
            {config.now.note}
          </p>
        </div>
      </div>
    </div>
  )
}
