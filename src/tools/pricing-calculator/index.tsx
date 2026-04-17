import { useState, useCallback } from 'react'

// ─── Shared Styles ────────────────────────────────────────────────
const css = {
  page: {
    maxWidth: 820,
    margin: '0 auto',
    padding: '32px 24px 80px',
  } as React.CSSProperties,

  title: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: 'var(--text-primary)',
    marginBottom: 24,
  } as React.CSSProperties,

  section: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 20px',
    marginBottom: 12,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: '1px solid var(--border-tertiary)',
  } as React.CSSProperties,

  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  } as React.CSSProperties,

  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  } as React.CSSProperties,

  label: {
    fontSize: 12,
    color: 'var(--text-secondary)',
  } as React.CSSProperties,

  input: {
    height: 34,
    padding: '0 10px',
    border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: 13,
    width: '100%',
    outline: 'none',
  } as React.CSSProperties,

  select: {
    height: 34,
    padding: '0 10px',
    border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: 13,
    width: '100%',
    outline: 'none',
  } as React.CSSProperties,

  hint: {
    fontSize: 11,
    color: 'var(--text-tertiary)',
  } as React.CSSProperties,

  btn: {
    width: '100%',
    height: 40,
    border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: 4,
    transition: 'background 0.15s',
  } as React.CSSProperties,

  metricGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 10,
    marginBottom: 12,
  } as React.CSSProperties,

  metric: {
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
  } as React.CSSProperties,

  metricLabel: {
    fontSize: 11,
    color: 'var(--text-secondary)',
    marginBottom: 4,
  } as React.CSSProperties,

  metricVal: {
    fontSize: 20,
    fontWeight: 500,
    color: 'var(--text-primary)',
  } as React.CSSProperties,

  metricSub: {
    fontSize: 11,
    color: 'var(--text-tertiary)',
    marginTop: 2,
  } as React.CSSProperties,

  table: {
    width: '100%',
    fontSize: 13,
    borderCollapse: 'collapse' as const,
  } as React.CSSProperties,

  td: {
    padding: '6px 0',
    borderBottom: '1px solid var(--border-tertiary)',
  } as React.CSSProperties,

  tdRight: {
    padding: '6px 0',
    borderBottom: '1px solid var(--border-tertiary)',
    textAlign: 'right' as const,
    fontWeight: 500,
  } as React.CSSProperties,

  warnBox: {
    background: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 12,
    color: '#92400e',
    marginTop: 8,
  } as React.CSSProperties,

  tag: {
    display: 'inline-block',
    fontSize: 11,
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
    marginLeft: 6,
  } as React.CSSProperties,
}

const accent = {
  green: { bg: '#dcfce7', val: '#166534' },
  blue: { bg: '#dbeafe', val: '#1e40af' },
  coral: { bg: '#fee2e2', val: '#991b1b' },
}

// ─── Helpers ──────────────────────────────────────────────────────
function fmt(n: number) {
  return '¥' + n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function pct(n: number) {
  return n.toFixed(1) + '%'
}

// ─── Field Component ──────────────────────────────────────────────
function Field({
  label,
  hint,
  placeholder,
  value,
  onChange,
  type = 'number',
}: {
  label: string
  hint?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div style={css.field}>
      <label style={css.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={css.input}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-secondary)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-primary)')}
      />
      {hint && <span style={css.hint}>{hint}</span>}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
interface FormState {
  rd_labor: string
  rd_material: string
  hw_cost: string
  cloud_cost: string
  logistics: string
  cert: string
  warranty: string
  volume: string
  amort_years: string
  amort_volume: string
  hw_margin: string
  sw_margin: string
  sales_rate: string
  admin_rate: string
  market_cost_rate: string
  implement_cost_rate: string
  channel_level: string
  dist1_margin: string
  dist2_margin: string
  mdf_rate: string
}

const defaults: FormState = {
  rd_labor: '',
  rd_material: '',
  hw_cost: '',
  cloud_cost: '',
  logistics: '',
  cert: '',
  warranty: '',
  volume: '',
  amort_years: '3',
  amort_volume: '',
  hw_margin: '30',
  sw_margin: '60',
  sales_rate: '8',
  admin_rate: '5',
  market_cost_rate: '6',
  implement_cost_rate: '4',
  channel_level: '2',
  dist1_margin: '30',
  dist2_margin: '20',
  mdf_rate: '5',
}

interface Result {
  total_cost: number
  channel_price: number
  retail_price: number
  saas_price: number
  saas_margin: number
  gross_margin: number
  breakeven: number
  breakdown: {
    hw_cost: number
    logistics: number
    cert: number
    warranty: number
    cloud_cost: number
    rd_amort: number
    market_cost: number
    implement_cost: number
  }
  channel: {
    factory: number
    d1_cost: number
    d1_sell: number
    d2_cost: number
    retail: number
    level: number
  }
  warnings: string[]
}

export default function PricingCalculator() {
  const [form, setForm] = useState<FormState>(defaults)
  const [result, setResult] = useState<Result | null>(null)

  const set = useCallback(
    (key: keyof FormState) => (v: string) => setForm((p) => ({ ...p, [key]: v })),
    [],
  )

  function calculate() {
    const v = (key: keyof FormState) => parseFloat(form[key]) || 0

    const rd_labor = v('rd_labor')
    const rd_material = v('rd_material')
    const hw_cost = v('hw_cost')
    const cloud_cost = v('cloud_cost')
    const logistics = v('logistics')
    const cert = v('cert')
    const warranty = v('warranty')
    const volume = v('volume') || 1
    const amort_years = v('amort_years') || 3
    const amort_vol = v('amort_volume') || volume
    const hw_margin = v('hw_margin') / 100
    const sw_margin = v('sw_margin') / 100
    const sales_rate = v('sales_rate') / 100
    const admin_rate = v('admin_rate') / 100
    const market_cost_rate = v('market_cost_rate') / 100
    const implement_cost_rate = v('implement_cost_rate') / 100
    const dist1 = v('dist1_margin') / 100
    const dist2 = v('dist2_margin') / 100
    const mdf = v('mdf_rate') / 100
    const level = parseInt(form.channel_level)

    const rd_amort = (rd_labor + rd_material) / (amort_years * amort_vol)

    // Market cost per unit (percentage of channel price, solved iteratively)
    // Implementation cost per unit (percentage of channel price)
    // Since these depend on channel_price, we factor them into the op_rate denominator
    const total_cost =
      hw_cost + cloud_cost + logistics + cert + warranty + rd_amort

    const op_rate = sales_rate + admin_rate + mdf + market_cost_rate + implement_cost_rate
    const channel_price = total_cost / (1 - hw_margin - op_rate)

    const market_cost_per_unit = channel_price * market_cost_rate
    const implement_cost_per_unit = channel_price * implement_cost_rate

    let retail_price: number
    if (level === 1) {
      retail_price = channel_price / (1 - dist2)
    } else {
      const d1_sell = channel_price / (1 - dist1)
      retail_price = d1_sell / (1 - dist2)
    }

    const saas_price = cloud_cost / (1 - sw_margin)
    const gross_margin =
      (channel_price - total_cost + cloud_cost) / channel_price
    const breakeven = Math.ceil(
      (rd_labor + rd_material) / (channel_price - total_cost + cloud_cost),
    )

    const warnings: string[] = []
    if (hw_margin < 0.2) warnings.push('硬件目标毛利率低于 20%，风险较高')
    if (retail_price > channel_price * 4)
      warnings.push('渠道层级加价幅度较大（>4倍），建议缩短渠道或提高出厂价')
    if (rd_amort > hw_cost * 0.3)
      warnings.push('研发摊销占单件成本超过 30%，建议提高出货量预测或延长摊销期')
    if (market_cost_rate + implement_cost_rate > 0.2)
      warnings.push('市场费用+实施费用合计超过 20%，请确认是否符合实际业务预期')

    setResult({
      total_cost: total_cost + market_cost_per_unit + implement_cost_per_unit,
      channel_price,
      retail_price,
      saas_price,
      saas_margin: sw_margin * 100,
      gross_margin: gross_margin * 100,
      breakeven,
      breakdown: {
        hw_cost,
        logistics,
        cert,
        warranty,
        cloud_cost,
        rd_amort,
        market_cost: market_cost_per_unit,
        implement_cost: implement_cost_per_unit,
      },
      channel: {
        factory: channel_price,
        d1_cost: channel_price,
        d1_sell: level === 2 ? channel_price / (1 - dist1) : channel_price,
        d2_cost: level === 2 ? channel_price / (1 - dist1) : channel_price,
        retail: retail_price,
        level,
      },
      warnings,
    })
  }

  const accentBox = (color: 'green' | 'blue' | 'coral') => ({
    ...css.metric,
    background: accent[color].bg,
  })

  return (
    <div style={css.page}>
      <h1 style={css.title}>产品售价计算器</h1>

      {/* Cost Input */}
      <div style={css.section}>
        <div style={css.sectionTitle}>成本输入</div>
        <div style={css.fieldGrid}>
          <Field label="研发人力成本（元）" placeholder="如 500000" hint="项目总研发人力费用" value={form.rd_labor} onChange={set('rd_labor')} />
          <Field label="研发物料成本（元）" placeholder="如 50000" hint="样机、测试物料等" value={form.rd_material} onChange={set('rd_material')} />
          <Field label="单件硬件成本（元）" placeholder="如 80" hint="BOM + 制造费用" value={form.hw_cost} onChange={set('hw_cost')} />
          <Field label="单件云服务成本/年（元）" placeholder="如 20" hint="服务器、带宽、存储等" value={form.cloud_cost} onChange={set('cloud_cost')} />
          <Field label="包装 & 物流成本/件（元）" placeholder="如 8" hint="包材 + 运费 + 保险" value={form.logistics} onChange={set('logistics')} />
          <Field label="认证 & 合规摊销/件（元）" placeholder="如 5" hint="CE/3C 等认证总费用÷出货量" value={form.cert} onChange={set('cert')} />
          <Field label="保修 & 售后成本/件（元）" placeholder="如 4" hint="通常取硬件成本的 2~5%" value={form.warranty} onChange={set('warranty')} />
          <Field label="首年预估出货量（件）" placeholder="如 10000" value={form.volume} onChange={set('volume')} />
        </div>
      </div>

      {/* Operations */}
      <div style={css.section}>
        <div style={css.sectionTitle}>运营参数</div>
        <div style={css.fieldGrid}>
          <Field label="研发成本摊销年限（年）" placeholder="如 3" hint="研发费用分摊到几年出货" value={form.amort_years} onChange={set('amort_years')} />
          <Field label="摊销期年均出货量（件）" placeholder="如 10000" hint="可与首年相同" value={form.amort_volume} onChange={set('amort_volume')} />
          <Field label="目标硬件毛利率（%）" placeholder="如 30" hint="建议 25~45%" value={form.hw_margin} onChange={set('hw_margin')} />
          <Field label="目标云服务毛利率（%）" placeholder="如 60" hint="建议 50~80%" value={form.sw_margin} onChange={set('sw_margin')} />
          <Field label="销售费用率（%）" placeholder="如 8" hint="占销售额百分比" value={form.sales_rate} onChange={set('sales_rate')} />
          <Field label="管理费用率（%）" placeholder="如 5" hint="公司 overhead 分摊" value={form.admin_rate} onChange={set('admin_rate')} />
          <Field label="市场费用率（%）" placeholder="如 6" hint="市场推广、品牌投放等占销售额百分比" value={form.market_cost_rate} onChange={set('market_cost_rate')} />
          <Field label="实施费用率（%）" placeholder="如 4" hint="部署、培训、现场支持等占销售额百分比" value={form.implement_cost_rate} onChange={set('implement_cost_rate')} />
        </div>
      </div>

      {/* Channel */}
      <div style={css.section}>
        <div style={css.sectionTitle}>渠道参数</div>
        <div style={css.fieldGrid}>
          <div style={css.field}>
            <label style={css.label}>渠道层级</label>
            <select
              value={form.channel_level}
              onChange={(e) => set('channel_level')(e.target.value)}
              style={css.select}
            >
              <option value="1">一级（厂家直供零售商）</option>
              <option value="2">二级（厂家→代理→零售）</option>
            </select>
          </div>
          <Field label="一级代理折扣（%）" placeholder="如 30" hint="一级代理的毛利空间" value={form.dist1_margin} onChange={set('dist1_margin')} />
          <Field label="二级代理/零售商折扣（%）" placeholder="如 20" hint="二级渠道的毛利空间" value={form.dist2_margin} onChange={set('dist2_margin')} />
          <Field label="MDF & 返点费率（%）" placeholder="如 5" hint="市场开发基金 + 季度返点" value={form.mdf_rate} onChange={set('mdf_rate')} />
        </div>
      </div>

      {/* Calculate Button */}
      <button style={css.btn} onClick={calculate} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-tertiary)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-secondary)' }}>
        计算建议价格
      </button>

      {/* Results */}
      {result && (
        <>
          <div style={{ ...css.section, marginTop: 12 }}>
            <div style={css.sectionTitle}>核算结果</div>
            <div style={css.metricGrid}>
              <div style={accentBox('blue')}>
                <div style={css.metricLabel}>单件综合成本</div>
                <div style={{ ...css.metricVal, color: accent.blue.val }}>{fmt(result.total_cost)}</div>
                <div style={css.metricSub}>含研发摊销 + 市场 + 实施</div>
              </div>
              <div style={accentBox('green')}>
                <div style={css.metricLabel}>建议渠道价（出厂价）</div>
                <div style={{ ...css.metricVal, color: accent.green.val }}>{fmt(result.channel_price)}</div>
                <div style={css.metricSub}>含运营费用</div>
              </div>
              <div style={accentBox('coral')}>
                <div style={css.metricLabel}>建议零售价（含税）</div>
                <div style={{ ...css.metricVal, color: accent.coral.val }}>{fmt(result.retail_price)}</div>
                <div style={css.metricSub}>渠道加价后</div>
              </div>
            </div>
            <div style={css.metricGrid}>
              <div style={css.metric}>
                <div style={css.metricLabel}>云服务年费建议定价</div>
                <div style={css.metricVal}>{fmt(result.saas_price)}/年</div>
                <div style={css.metricSub}>云服务毛利率 {pct(result.saas_margin)}</div>
              </div>
              <div style={css.metric}>
                <div style={css.metricLabel}>首年综合毛利率</div>
                <div style={css.metricVal}>{pct(result.gross_margin)}</div>
                <div style={css.metricSub}>
                  {result.gross_margin > 25 ? (
                    <span style={{ ...css.tag, background: '#dcfce7', color: '#166534' }}>健康</span>
                  ) : (
                    <span style={{ ...css.tag, background: '#fef3c7', color: '#92400e' }}>偏低</span>
                  )}
                </div>
              </div>
              <div style={css.metric}>
                <div style={css.metricLabel}>研发回本出货量</div>
                <div style={css.metricVal}>{result.breakeven.toLocaleString()}</div>
                <div style={css.metricSub}>件</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div style={css.section}>
            <div style={css.sectionTitle}>成本拆解</div>
            <table style={css.table}>
              <tbody>
                <tr><td style={css.td}>硬件 BOM + 制造</td><td style={css.tdRight}>{fmt(result.breakdown.hw_cost)}</td></tr>
                <tr><td style={css.td}>包装 & 物流</td><td style={css.tdRight}>{fmt(result.breakdown.logistics)}</td></tr>
                <tr><td style={css.td}>认证 & 合规摊销</td><td style={css.tdRight}>{fmt(result.breakdown.cert)}</td></tr>
                <tr><td style={css.td}>保修 & 售后</td><td style={css.tdRight}>{fmt(result.breakdown.warranty)}</td></tr>
                <tr><td style={css.td}>云服务成本/年</td><td style={css.tdRight}>{fmt(result.breakdown.cloud_cost)}</td></tr>
                <tr><td style={css.td}>研发成本摊销/件</td><td style={css.tdRight}>{fmt(result.breakdown.rd_amort)}</td></tr>
                <tr><td style={{ ...css.td, color: 'var(--text-secondary)', fontSize: 11 }} colSpan={2}>（研发人力 + 物料）÷（摊销年限 × 年均量）</td></tr>
                <tr><td style={css.td}>市场费用/件</td><td style={css.tdRight}>{fmt(result.breakdown.market_cost)}</td></tr>
                <tr><td style={css.td}>实施费用/件</td><td style={css.tdRight}>{fmt(result.breakdown.implement_cost)}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Channel */}
          <div style={css.section}>
            <div style={css.sectionTitle}>渠道价格结构</div>
            <table style={css.table}>
              <tbody>
                <tr><td style={css.td}>出厂价（建议渠道价）</td><td style={css.tdRight}>{fmt(result.channel.factory)}</td></tr>
                {result.channel.level === 1 ? (
                  <>
                    <tr><td style={css.td}>一级代理成本</td><td style={{ ...css.tdRight, color: 'var(--text-tertiary)' }}>直供模式，跳过</td></tr>
                    <tr><td style={css.td}>一级代理售价</td><td style={{ ...css.tdRight, color: 'var(--text-tertiary)' }}>直供模式，跳过</td></tr>
                  </>
                ) : (
                  <>
                    <tr><td style={css.td}>一级代理成本</td><td style={css.tdRight}>{fmt(result.channel.d1_cost)}</td></tr>
                    <tr><td style={css.td}>一级代理售价 → 二级</td><td style={css.tdRight}>{fmt(result.channel.d1_sell)}</td></tr>
                  </>
                )}
                <tr><td style={css.td}>二级代理/零售商进货价</td><td style={css.tdRight}>{fmt(result.channel.d2_cost)}</td></tr>
                <tr><td style={css.td}>建议零售价（RRP）</td><td style={css.tdRight}>{fmt(result.channel.retail)}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div style={css.warnBox}>
              注意：{result.warnings.join('；')}
            </div>
          )}
        </>
      )}
    </div>
  )
}
