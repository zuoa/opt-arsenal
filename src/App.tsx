import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { getTools, getToolLoader } from './lib/tool-registry'
import './tools/index' // register all tools
import Layout from './components/Layout'
import Home from './components/Home'

const toolLoaders = Object.fromEntries(
  getTools().map((t) => [t.id, lazy(getToolLoader(t.id)!)]),
)

function ToolFallback() {
  return (
    <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
      加载中...
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<ToolFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {getTools().map((t) => {
              const Component = toolLoaders[t.id]
              return (
                <Route key={t.id} path={t.path} element={<Component />} />
              )
            })}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
