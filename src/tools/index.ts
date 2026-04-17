import { registerTool } from '../lib/tool-registry'

// ─── Register tools here ─────────────────────────────────────────
// To add a new tool:
//   1. Create a folder under src/tools/<your-tool>/
//   2. Create index.tsx with a default export React component
//   3. Add a registerTool() call below
//   4. Done — it appears on the homepage automatically.

registerTool(
  {
    id: 'pricing-calculator',
    name: '产品售价计算器',
    description: '软硬一体产品渠道价与零售价核算，含市场/实施费用',
    category: '商业计算',
    icon: 'Calculator',
    path: '/tools/pricing-calculator',
  },
  () => import('./pricing-calculator'),
)

// registerTool(
//   {
//     id: 'next-tool',
//     name: '下一个工具',
//     description: '描述',
//     category: '分类',
//     icon: 'Wrench',
//     path: '/tools/next-tool',
//   },
//   () => import('./next-tool'),
// )
