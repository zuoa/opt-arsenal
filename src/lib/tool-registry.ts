import type { ComponentType } from 'react'

export interface ToolMeta {
  id: string
  name: string
  description: string
  category: string
  icon: string // lucide icon name
  path: string
}

interface ToolDefinition {
  meta: ToolMeta
  component: () => Promise<{ default: ComponentType }>
}

const tools: ToolDefinition[] = []

export function registerTool(
  meta: ToolMeta,
  component: () => Promise<{ default: ComponentType }>,
) {
  tools.push({ meta, component })
}

export function getTools(): ToolMeta[] {
  return tools.map((t) => t.meta)
}

export function getToolsByCategory(): Record<string, ToolMeta[]> {
  const map: Record<string, ToolMeta[]> = {}
  for (const t of tools) {
    ;(map[t.meta.category] ??= []).push(t.meta)
  }
  return map
}

export function getToolLoader(id: string) {
  return tools.find((t) => t.meta.id === id)?.component ?? null
}
