import { Icon } from './ui'

export type Page = 'dashboard' | 'inventory' | 'movements' | 'history' | 'maintenance' | 'teams' | 'settings'

const NAV = [
  { section: 'Main Menu', items: [
    { id: 'dashboard' as Page, icon: 'dashboard', label: 'Dashboard' },
    { id: 'inventory' as Page, icon: 'inventory_2', label: 'Inventory' },
    { id: 'movements' as Page, icon: 'sync_alt', label: 'Movements' },
  ]},
  { section: 'Administration', items: [
    { id: 'history' as Page, icon: 'history', label: 'Checkout History', badge: 3 },
    { id: 'maintenance' as Page, icon: 'build', label: 'Maintenance Log' },
    { id: 'teams' as Page, icon: 'groups', label: 'Team Management' },
    { id: 'settings' as Page, icon: 'settings', label: 'Settings' },
  ]},
]

export default function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-[var(--surface-low)] border-r border-[var(--border)] p-4 min-h-screen sticky top-14 h-[calc(100vh-56px)]">
      {/* Admin card */}
      <div className="flex items-center gap-3 p-3 bg-[var(--surface-high)] rounded-xl mb-5">
        <div className="w-10 h-10 rounded-lg bg-[var(--primary-container)] flex items-center justify-center shrink-0">
          <Icon name="admin_panel_settings" size={22} fill className="text-white" />
        </div>
        <div>
          <div className="font-sora text-sm font-semibold text-[var(--primary)]">InfoLive Admin</div>
          <div className="text-[10px] tracking-wider text-[var(--on-surface-variant)] uppercase">Inventory Manager</div>
        </div>
      </div>

      {/* Nav */}
      {NAV.map(group => (
        <div key={group.section} className="mb-3">
          <div className="text-[9px] font-bold tracking-widest text-[var(--on-surface-variant)] uppercase px-3 py-2 opacity-60">{group.section}</div>
          {group.items.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm mb-0.5 border-none cursor-pointer text-left ${page === item.id ? 'active' : 'text-[var(--on-surface-variant)]'}`}
            >
              <Icon name={item.icon} size={20} fill={page === item.id} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-[var(--primary-container)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}

      {/* Sync status */}
      <div className="mt-auto p-3 bg-[rgba(51,53,57,.3)] rounded-xl border border-[rgba(48,54,61,.4)]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold tracking-wider text-[var(--on-secondary-container)] uppercase">Cloud Sync</span>
          <span className="dot dot-avail" />
        </div>
        <div className="text-[11px] text-[var(--on-surface-variant)]">Connected to Supabase Pro</div>
        <div className="text-[10px] text-[rgba(177,180,200,.4)] mt-0.5">Version v1.0.4</div>
      </div>
    </aside>
  )
}
