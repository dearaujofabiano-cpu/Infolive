import React from 'react'

// ── Icon ──────────────────────────────────────────────────
export const Icon = ({ name, size = 20, fill = false, className = '' }: {
  name: string; size?: number; fill?: boolean; className?: string
}) => (
  <span
    className={`material-symbols-outlined ${fill ? 'fill-icon' : ''} ${className}`}
    style={{ fontSize: size }}
    aria-hidden="true"
  >{name}</span>
)

// ── Badge ─────────────────────────────────────────────────
type BadgeVariant = 'avail' | 'warn' | 'crit' | 'sec' | 'tert' | 'primary'
const badgeMap: Record<BadgeVariant, string> = {
  avail: 'bg-[rgba(0,200,83,.1)] text-[#00C853] border border-[rgba(0,200,83,.2)]',
  warn: 'bg-[rgba(255,214,0,.1)] text-[#FFD600] border border-[rgba(255,214,0,.2)]',
  crit: 'bg-[rgba(234,8,61,.1)] text-[#EA083D] border border-[rgba(234,8,61,.2)]',
  sec: 'bg-[rgba(65,70,87,.4)] text-[#b0b4c8] border border-[rgba(65,70,87,.6)]',
  tert: 'bg-[rgba(0,218,243,.1)] text-[#00daf3] border border-[rgba(0,218,243,.2)]',
  primary: 'bg-[rgba(234,8,61,.1)] text-[#ffb3b3] border border-[rgba(234,8,61,.2)]',
}
export const Badge = ({ variant, children, pulse }: { variant: BadgeVariant; children: React.ReactNode; pulse?: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${badgeMap[variant]} ${pulse ? 'pulse' : ''}`}>
    {children}
  </span>
)

// ── StatusDot ─────────────────────────────────────────────
export const StatusDot = ({ status }: { status: 'AVAILABLE' | 'IN USE' | 'MAINTENANCE' }) => {
  const cls = status === 'AVAILABLE' ? 'dot-avail' : status === 'IN USE' ? 'dot-warn' : 'dot-crit'
  return <span className={`dot ${cls}`} />
}

// ── Btn ───────────────────────────────────────────────────
type BtnVariant = 'primary' | 'ghost' | 'tert' | 'crit' | 'notify'
const btnMap: Record<BtnVariant, string> = {
  primary: 'bg-[var(--primary-container)] text-[var(--on-primary-container)] hover:brightness-110',
  ghost: 'bg-[rgba(22,27,34,.8)] text-[var(--on-surface)] border border-[var(--border)] hover:bg-[var(--surface-high)]',
  tert: 'bg-[rgba(0,218,243,.1)] text-[var(--tertiary)] border border-[rgba(0,218,243,.2)] hover:bg-[rgba(0,218,243,.15)]',
  crit: 'bg-[rgba(234,8,61,.1)] text-[var(--critical)] border border-[rgba(234,8,61,.2)]',
  notify: 'bg-[var(--critical)] text-white hover:brightness-110',
}
export const Btn = ({
  variant = 'ghost', size = 'md', onClick, children, className = '', disabled
}: {
  variant?: BtnVariant; size?: 'sm' | 'md' | 'lg'
  onClick?: () => void; children: React.ReactNode; className?: string; disabled?: boolean
}) => {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-[11px]' : size === 'lg' ? 'px-6 py-2.5 text-sm' : 'px-4 py-2 text-xs'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg font-bold tracking-wide uppercase cursor-pointer transition-all disabled:opacity-40 ${sz} ${btnMap[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// ── GCard ─────────────────────────────────────────────────
export const GCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-card overflow-hidden ${className}`}>{children}</div>
)

export const GCardHead = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-container)] flex-wrap gap-y-2">
    {children}
  </div>
)

export const GCardTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] flex items-center gap-2">
    {children}
  </span>
)

// ── Input ─────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: string }>(
  ({ icon, className = '', ...props }, ref) => (
    <div className="relative">
      {icon && <Icon name={icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] pointer-events-none" />}
      <input
        ref={ref}
        {...props}
        className={`w-full bg-[var(--surface-lowest)] border border-[var(--border)] text-[var(--on-surface)] rounded-lg py-2.5 pr-3 text-sm outline-none transition-colors focus:border-[var(--primary)] font-[Geist] ${icon ? 'pl-10' : 'pl-3'} ${className}`}
      />
    </div>
  )
)

export const Select = ({ children, icon, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { icon?: string }) => (
  <div className="relative">
    {icon && <Icon name={icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] pointer-events-none z-10" />}
    <select
      {...props}
      className={`w-full bg-[var(--surface-lowest)] border border-[var(--border)] text-[var(--on-surface)] rounded-lg py-2.5 pr-3 text-sm outline-none appearance-none transition-colors focus:border-[var(--primary)] font-[Geist] ${icon ? 'pl-10' : 'pl-3'}`}
    >
      {children}
    </select>
  </div>
)

// ── Table ─────────────────────────────────────────────────
export const Table = ({ headers, children }: { headers: string[]; children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[var(--surface-high)]">
          {headers.map(h => (
            <th key={h} className="px-4 py-2.5 text-left text-[9px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] border-b border-[var(--border)]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)

export const TR = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <tr className="tr-hover border-l-2 border-l-transparent" onClick={onClick}>
    {children}
  </tr>
)

export const TD = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-sm border-b border-[rgba(48,54,61,.4)] align-middle last:border-b-0 ${className}`}>
    {children}
  </td>
)

// ── Stat4 ─────────────────────────────────────────────────
export const Stat4 = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="bg-[var(--surface-low)] border border-[var(--border)] rounded-xl p-3">
    <div className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ color }}>{label}</div>
    <div className="font-sora text-2xl font-bold leading-none" style={{ color }}>{value}</div>
  </div>
)

// ── Empty ─────────────────────────────────────────────────
export const Empty = ({ icon, title, sub }: { icon: string; title: string; sub?: string }) => (
  <div className="text-center py-16">
    <Icon name={icon} size={48} className="text-[var(--on-surface-variant)] mb-4" />
    <div className="font-sora text-lg font-semibold mb-2">{title}</div>
    {sub && <div className="text-sm text-[var(--on-surface-variant)]">{sub}</div>}
  </div>
)

// ── ProgBar ───────────────────────────────────────────────
export const ProgBar = ({ pct, color }: { pct: number; color: string }) => (
  <div className="prog-track w-full">
    <div className="prog-fill" style={{ width: `${pct}%`, background: color }} />
  </div>
)
