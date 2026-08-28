import { useMemo } from 'react'

import { buildGraph } from '@/components/ezra/graph-data'
import { cn } from '@/lib/utils'

export type DecisionQueueRow = {
  label: string
  reason: string
  tag: 'NEEDS YOU' | 'CLEARED'
}

export type DecisionQueuePanelConfig = {
  /** Seed for the deterministic blast-radius graph. */
  seed?: number
  /** Label above the total queue count. */
  queueLabel: string
  /** Total items in today's queue, e.g. "11". */
  queueTotal: string
  /** Three-cell stat grid. */
  stats: {
    clearedLabel: string
    clearedValue: string
    needsYouLabel: string
    needsYouValue: string
    timeLabel: string
    timeValue: string
  }
  /** Exactly five stacked rows: the escalated ones first, then the cleared ones. */
  rows: [
    DecisionQueueRow,
    DecisionQueueRow,
    DecisionQueueRow,
    DecisionQueueRow,
    DecisionQueueRow,
  ]
  /** Footer band inside the dark panel. */
  panelCaption: string
}

export function DecisionQueuePanel({
  config,
}: {
  config: DecisionQueuePanelConfig
}) {
  const graph = useMemo(() => buildGraph(config.seed ?? 1337), [config.seed])

  // Ring exactly two nodes — the two escalated rows — in their severity colour.
  const ringTargets = useMemo(() => {
    const crimsonNode = graph.nodes.find((n) => n.severity === 'crimson')
    const amberNode = graph.nodes.find((n) => n.severity === 'amber')
    return [
      crimsonNode ? { node: crimsonNode, color: '#e8092e' } : null,
      amberNode ? { node: amberNode, color: '#ff8a00' } : null,
    ].filter((t): t is { node: (typeof graph.nodes)[number]; color: string } =>
      Boolean(t),
    )
  }, [graph.nodes])

  return (
    <div className="relative rounded-xl bg-deep shadow-hero">
      <div className="flex flex-col md:min-h-[460px] md:flex-row">
        <div className="relative order-2 min-h-[300px] md:order-1 md:w-[66%]">
          <svg
            viewBox={`0 0 ${graph.width} ${graph.height}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMinYMid slice"
            role="img"
            aria-label="Dependency graph, fully resolved and at rest, with the two nodes touched by today's escalated decisions ringed"
          >
            <g opacity={0.55}>
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
            {ringTargets.map(({ node, color }) => (
              <circle
                key={`ring-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={6}
                fill="none"
                stroke={color}
                strokeWidth={0.9}
                opacity={0.9}
              />
            ))}
          </svg>
        </div>

        <div className="order-1 flex flex-col justify-between gap-6 border-b border-hairline-dark p-6 md:order-2 md:w-[34%] md:border-b-0 md:border-l md:p-7">
          <div>
            <p className="font-mono text-xs tracking-[0.08em] text-on-deep-muted">
              {config.queueLabel}
            </p>
            <p className="mt-1 font-mono text-2xl text-on-deep">
              {config.queueTotal}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                {config.stats.clearedLabel}
              </p>
              <p className="mt-1 font-mono text-sm text-on-deep">
                {config.stats.clearedValue}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                {config.stats.needsYouLabel}
              </p>
              <p className="mt-1 font-mono text-sm text-cyan">
                {config.stats.needsYouValue}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.06em] text-on-deep-muted">
                {config.stats.timeLabel}
              </p>
              <p className="mt-1 font-mono text-sm text-on-deep">
                {config.stats.timeValue}
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-hairline-dark pt-4">
            {config.rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug text-on-deep">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-on-deep-muted">
                    {row.reason}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase',
                    row.tag === 'NEEDS YOU' ? 'text-cyan' : 'text-on-deep-muted',
                  )}
                >
                  {row.tag}
                </span>
              </div>
            ))}
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
