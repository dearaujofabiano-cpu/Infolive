import { Icon, Btn } from './ui'

export default function Topbar({ onExport }: { onExport?: () => void }) {
  return (
    <header className="glass sticky top-0 z-50 flex items-center gap-3 px-5 h-14 border-b border-[var(--border-variant)]">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-[var(--primary-container)] px-2 py-1 rounded">
          <span className="font-sora text-sm font-bold text-white tracking-widest">INFOLIVE</span>
        </div>
        <span className="font-sora text-base font-bold text-[var(--primary)] hidden sm:block">Brasil</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4 relative hidden md:block">
        <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
        <input
          type="text"
          placeholder="Command-K to search equipment..."
          className="w-full bg-[var(--surface-lowest)] border border-[var(--border)] rounded-lg py-1.5 pl-9 pr-4 text-xs text-[var(--on-surface)] outline-none focus:border-[var(--tertiary)] transition-colors font-[Geist]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
          <span className="bg-[var(--surface-high)] border border-[var(--border)] rounded px-1 text-[9px] text-[var(--on-surface-variant)]">⌘</span>
          <span className="bg-[var(--surface-high)] border border-[var(--border)] rounded px-1 text-[9px] text-[var(--on-surface-variant)]">K</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Btn variant="ghost" size="sm" onClick={onExport}>
          <Icon name="download" size={15} />
          <span className="hidden sm:inline">Export</span>
        </Btn>
        <div className="w-8 h-8 rounded-full bg-[var(--secondary-container)] border border-[var(--border)] flex items-center justify-center font-sora text-xs font-bold text-[var(--primary)]">
          LG
        </div>
      </div>
    </header>
  )
}
