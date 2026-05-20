import { useState } from 'react'
import { GCard, GCardHead, GCardTitle, Icon, Badge, Btn } from '../components/ui'
import { PENDENTES, EQUIPES } from '../data/seed'
import type { Page } from '../components/Sidebar'

const getEq = (id: string) => EQUIPES.find(e => e.id === id)

export default function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [confirmed, setConfirmed] = useState<string | null>(null)

  const handleReturn = (id: string, equipeId: string) => {
    const eq = getEq(equipeId)
    setConfirmed(`Retorno da ${eq?.nome} confirmado! Equipamentos disponíveis novamente.`)
    setTimeout(() => setConfirmed(null), 3000)
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-sora text-2xl font-bold">Checkout History</h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Logística e rastreamento de equipamentos em tempo real.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[var(--surface-low)] border border-[var(--border)] p-2.5 rounded-xl flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[rgba(0,218,243,.1)] flex items-center justify-center shrink-0">
              <Icon name="outbound" size={18} className="text-[var(--tertiary)]" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold text-[var(--on-surface-variant)] tracking-wider">Active Exits</div>
              <div className="font-sora text-xl font-bold leading-tight">42</div>
            </div>
          </div>
          <div className="bg-[var(--surface-low)] border border-[var(--border)] p-2.5 rounded-xl flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[rgba(0,200,83,.1)] flex items-center justify-center shrink-0">
              <Icon name="inventory" size={18} className="text-[var(--available)]" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold text-[var(--on-surface-variant)] tracking-wider">In Stock</div>
              <div className="font-sora text-xl font-bold leading-tight">148</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm banner */}
      {confirmed && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,200,83,.1)] border border-[rgba(0,200,83,.3)] rounded-xl mb-5 slide-down text-sm text-[var(--available)]">
          <Icon name="check_circle" size={18} className="text-[var(--available)]" />
          {confirmed}
        </div>
      )}

      {/* Alert */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(234,8,61,.08)] border border-[rgba(234,8,61,.4)] rounded-xl mb-6">
        <Icon name="notification_important" size={20} className="text-[var(--critical)] shrink-0" />
        <div className="flex-1">
          <span className="font-bold text-[var(--critical)] text-sm">2 saídas com retorno ATRASADO!</span>
          <span className="text-[var(--on-surface-variant)] text-xs ml-2">Equipe Beta — Webinar Itaú / Ensaio Corp.</span>
        </div>
        <Btn variant="crit" size="sm" onClick={() => setPage('history')}>Ver →</Btn>
      </div>

      {/* Bento */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bento-card glass-card p-4 border border-[var(--border)]">
          <div className="flex justify-between items-start mb-3">
            <Icon name="outbound" size={20} className="text-[var(--tertiary)]" />
            <span className="text-[10px] font-bold tracking-wider bg-[rgba(0,218,243,.1)] text-[var(--tertiary)] px-2 py-0.5 rounded uppercase">Live Session</span>
          </div>
          <div className="font-sora text-4xl font-bold">42</div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] mt-1">Equipamentos Fora</div>
        </div>
        <div className="glass-card p-4 border bg-[rgba(234,8,61,.08)] border-[rgba(234,8,61,.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-[.07]"><Icon name="warning" size={80} /></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <Icon name="notification_important" size={20} className="text-[var(--critical)]" />
            <span className="text-[10px] font-bold tracking-wider bg-[var(--critical)] text-white px-2 py-0.5 rounded uppercase pulse">Urgente</span>
          </div>
          <div className="font-sora text-4xl font-bold text-[var(--critical)] relative z-10">08</div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--critical)] mt-1 relative z-10">Alertas de Retorno</div>
        </div>
        <div className="bento-card glass-card p-4 border border-[var(--border)]" style={{} as React.CSSProperties}>
          <div className="flex justify-between items-start mb-3">
            <Icon name="inventory_2" size={20} className="text-[var(--on-surface-variant)]" />
            <span className="text-[10px] font-bold tracking-wider bg-[rgba(177,180,200,.1)] text-[var(--on-surface-variant)] px-2 py-0.5 rounded uppercase">Total Assets</span>
          </div>
          <div className="font-sora text-4xl font-bold">1,284</div>
          <div className="text-[10px] uppercase tracking-widest text-[var(--on-surface-variant)] mt-1">Estoque Total</div>
        </div>
      </div>

      {/* Próximos Retornos */}
      <div className="flex justify-between items-end mb-3">
        <div>
          <h3 className="font-sora text-lg font-semibold">Próximos Retornos</h3>
          <p className="text-xs text-[var(--on-surface-variant)]">Logística de entrada para as próximas 48 horas</p>
        </div>
        <Btn variant="tert" size="sm" onClick={() => setPage('history')}>VER TODOS</Btn>
      </div>

      <GCard className="mb-5">
        {PENDENTES.map((p) => {
          const eq = getEq(p.equipe)
          return (
            <div key={p.id} className={`flex items-center justify-between flex-wrap gap-3 px-4 py-3.5 border-b border-[rgba(48,54,61,.4)] last:border-b-0 hover:bg-[rgba(51,53,57,.3)] transition-colors ${p.atrasado ? 'border-l-2 border-l-[var(--critical)]' : ''}`}>
              <div className="flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 bg-[var(--surface-high)] border border-[var(--border)] rounded-lg flex items-center justify-center shrink-0 text-lg">
                  {eq?.emoji}
                </div>
                <div>
                  <div className="text-sm font-semibold">{p.projeto}</div>
                  <div className="font-mono-data text-xs text-[var(--on-surface-variant)]">Team: {eq?.nome}</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <div className={`text-[9px] font-bold tracking-wider uppercase ${p.atrasado ? 'text-[var(--critical)]' : 'text-[var(--on-surface-variant)]'}`}>
                    {p.atrasado ? `ATRASADO ${p.dias}d` : 'Data Prevista'}
                  </div>
                  <div className={`font-mono-data text-sm ${p.atrasado ? 'text-[var(--critical)]' : 'text-[var(--primary)]'}`}>
                    {p.previsao}
                  </div>
                </div>
                <Btn variant={p.atrasado ? 'crit' : 'ghost'} size="sm" onClick={() => handleReturn(p.id, p.equipe)}>
                  <Icon name="corner_down_left" size={14} />
                  {p.atrasado ? 'Urgente' : 'Check-In'}
                </Btn>
                <button className="text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors">
                  <Icon name="chevron_right" size={20} />
                </button>
              </div>
            </div>
          )
        })}
      </GCard>

      {/* Bottom grid */}
      <div className="grid grid-cols-2 gap-4">
        <GCard>
          <GCardHead><GCardTitle><Icon name="timeline" size={15} />Atividade Recente</GCardTitle><Icon name="refresh" size={18} className="text-[var(--on-surface-variant)] cursor-pointer" /></GCardHead>
          <div className="divide-y divide-[rgba(48,54,61,.3)]">
            {[
              { dot: 'dot-avail', text: <><b>Marcos S.</b> devolveu 5 baterias V-Mount</>, time: 'Há 15 minutos' },
              { dot: 'dot-warn' as const, text: <><b>Leticia F.</b> registrou nova saída: Red V-Raptor Kit</>, time: 'Há 1 hora' },
              { dot: 'dot-warn', text: <><b>Sistema:</b> Manutenção preventiva agendada para Lente 35mm Sigma</>, time: 'Há 3 horas' },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 px-4 py-3">
                <span className={`dot ${a.dot} mt-1.5 shrink-0`} />
                <div>
                  <div className="text-sm">{a.text}</div>
                  <div className="text-[10px] text-[var(--on-surface-variant)] mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </GCard>

        <div className="glass-card relative overflow-hidden flex flex-col justify-end p-5 min-h-[180px]"
          style={{ background: 'linear-gradient(135deg, rgba(22,27,34,.9) 0%, rgba(16,18,24,.95) 100%)' }}>
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--primary-container)] to-transparent" />
          <div className="relative z-10">
            <div className="font-sora text-base font-semibold mb-2">Otimização de Inventário</div>
            <div className="text-xs text-[var(--on-secondary-container)] mb-4">12 itens parados há mais de 30 dias. Considere revisar o catálogo.</div>
            <Btn variant="primary" size="sm">VER RELATÓRIO</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
