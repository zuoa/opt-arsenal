import { Calculator, Box } from 'lucide-react'

// Add icons here as you add tools. Only imported icons are bundled.
const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Calculator,
}

export function getIcon(name: string) {
  return iconMap[name] ?? Box
}
