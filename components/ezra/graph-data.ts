// Deterministic pseudo-random blast-radius graph used by the hero artifact.
// Seeded so server and client render identically.

export type GraphNode = {
  id: number
  parent: number | null
  depth: number
  x: number
  y: number
  severity: 'default' | 'amber' | 'crimson'
}

export type GraphEdge = {
  from: number
  to: number
}

export type GraphData = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  width: number
  height: number
  rootId: number
}

function mulberry32(seed: number) {
  let s = seed
  return function random() {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const TARGET_NODES = 182
const WIDTH = 700
const HEIGHT = 460
const ROOT_X = 26
const ROOT_Y = 232
const MAX_RADIUS = 470
const HALF_ANGLE = 40

export function buildGraph(seed = 1337): GraphData {
  const rand = mulberry32(seed)

  type Draft = { id: number; parent: number | null; depth: number; children: number[] }
  const draft: Draft[] = [{ id: 0, parent: null, depth: 0, children: [] }]

  let frontier = [0]
  let depth = 1
  while (draft.length < TARGET_NODES && depth < 9) {
    const nextFrontier: number[] = []
    for (const parentId of frontier) {
      if (draft.length >= TARGET_NODES) break
      const childCount =
        depth === 1 ? 5 + Math.floor(rand() * 2) : 1 + Math.floor(rand() * 3)
      for (let i = 0; i < childCount && draft.length < TARGET_NODES; i++) {
        const id = draft.length
        draft.push({ id, parent: parentId, depth, children: [] })
        draft[parentId].children.push(id)
        nextFrontier.push(id)
      }
    }
    frontier = nextFrontier
    depth++
  }

  const maxDepth = Math.max(...draft.map((n) => n.depth))
  const leaves = draft.filter((n) => n.children.length === 0)

  const angleFor: Record<number, number> = {}
  leaves.forEach((leaf, i) => {
    const t = leaves.length === 1 ? 0.5 : i / (leaves.length - 1)
    angleFor[leaf.id] = -HALF_ANGLE + t * (HALF_ANGLE * 2)
  })
  for (let i = draft.length - 1; i >= 0; i--) {
    const n = draft[i]
    if (n.children.length > 0) {
      const avg =
        n.children.reduce((sum, c) => sum + angleFor[c], 0) / n.children.length
      angleFor[n.id] = avg
    }
  }

  // Pick severity terminals: deepest leaf → crimson, four spread leaves → amber.
  const deepestLeaf = leaves.reduce((a, b) => (b.depth > a.depth ? b : a))
  const remainingLeaves = leaves.filter((l) => l.id !== deepestLeaf.id)
  const amberFractions = [0.12, 0.36, 0.63, 0.87]
  const amberIds = new Set(
    amberFractions.map(
      (f) => remainingLeaves[Math.floor(f * (remainingLeaves.length - 1))].id,
    ),
  )

  const nodes: GraphNode[] = draft.map((n) => {
    const jitterAngle = (rand() - 0.5) * 5
    const angleDeg = angleFor[n.id] + jitterAngle
    const radiusJitter = 0.92 + rand() * 0.14
    const radius = (n.depth / maxDepth) * MAX_RADIUS * radiusJitter
    const rad = (angleDeg * Math.PI) / 180
    const x = n.id === 0 ? ROOT_X : ROOT_X + radius * Math.cos(rad)
    const y = n.id === 0 ? ROOT_Y : ROOT_Y + radius * Math.sin(rad)
    const severity: GraphNode['severity'] =
      n.id === deepestLeaf.id ? 'crimson' : amberIds.has(n.id) ? 'amber' : 'default'
    return { id: n.id, parent: n.parent, depth: n.depth, x, y, severity }
  })

  const edges: GraphEdge[] = draft
    .filter((n) => n.parent !== null)
    .map((n) => ({ from: n.parent as number, to: n.id }))

  return { nodes, edges, width: WIDTH, height: HEIGHT, rootId: 0 }
}
