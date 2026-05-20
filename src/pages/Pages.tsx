import { useState } from 'react'
import { GCard, GCardHead, GCardTitle, Icon, Badge, Btn, Stat4, Table, TR, TD, StatusDot, Input, Select, ProgBar, Empty } from '../components/ui'
import { EQUIPAMENTOS, MOVIMENTACOES, MANUTENCOES, EQUIPES, PENDENTES } from '../data/seed'
import type { Page } from '../components/Sidebar'

const getEq = (id: string) => EQUIPES.find(e => e.id === id)

// ─────────────────────────────────────────────────────────────
// INVENTORY
// ─────────────────────────────────────────────────────────────
export function InventoryPage() {
  const [cat, setCat] = useState('ALL')
  const cats = ['ALL', 'CAMERAS', 'AUDIO', 'LIGHTING', 'SUPPORT', 'ACCESSORIES']
  const filtered = EQUIPAMENTOS.filter(e => cat === 'ALL' || e.categoria === cat)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-sora text-2xl font-bold">Inventory Overview</h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Manage and track your high-performance production gear.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase cursor-pointer border transition-all ${cat === c ? 'bg-[var(--primary-container)] text-white border-[var(--primary-container)]' : 'bg-transparent text-[var(--on-surface-variant)] border-[var(--border)] hover:border-[var(--primary)]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <Stat4 label="Total Assets" value="1,284" color="var(--primary)" />
        <Stat4 label="Available" value="942" color="var(--available)" />
        <Stat4 label="In Use" value="312" color="var(--warning)" />
        <Stat4 label="Maintenance" value="30" color="var(--critical)" />
      </div>

      <GCard>
        <GCardHead>
          <GCardTitle>Equipment / Serial</GCardTitle>
          <Input placeholder="Search equipment..." className="w-48 text-xs py-1.5" />
        </GCardHead>
        <Table headers={['Equipment / Serial', 'Category', 'Status', 'In Stock', '']}>
          {filtered.map(e => {
            const disp = e.total - e.campo
            const pct = Math.round(disp / e.total * 100)
            const statusVariant = e.status === 'AVAILABLE' ? 'avail' : e.status === 'IN USE' ? 'warn' : 'crit'
            return (
              <TR key={e.id}>
                <TD>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[var(--surface-lowest)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      <Icon name={e.categoria === 'CAMERAS' ? 'videocam' : e.categoria === 'AUDIO' ? 'mic' : e.categoria === 'LIGHTING' ? 'light_mode' : 'camera_alt'} size={22} className="text-[var(--on-surface-variant)]" />
                    </div>
                    <div>
                      <div className="font-sora text-sm font-semibold">{e.nome}</div>
                      <div className="font-mono-data text-[11px] text-[var(--on-surface-variant)] opacity-70">{e.serie}</div>
                    </div>
                  </div>
                </TD>
                <TD><Badge variant="sec">{e.categoria}</Badge></TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <StatusDot status={e.status as any} />
                    <Badge variant={statusVariant}>{e.status}</Badge>
                  </div>
                </TD>
                <TD>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-data text-sm">{disp} / {e.total}</span>
                    <div className="w-20">
                      <ProgBar pct={pct} color={pct > 50 ? 'var(--available)' : pct > 20 ? 'var(--warning)' : 'var(--critical)'} />
                    </div>
                  </div>
                </TD>
                <TD>
                  <button className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">
                    <Icon name="more_vert" size={18} />
                  </button>
                </TD>
              </TR>
            )
          })}
        </Table>
        <div className="px-4 py-3 bg-[var(--surface-low)] border-t border-[var(--border)] flex justify-between items-center">
          <span className="text-xs text-[var(--on-surface-variant)]">Showing {filtered.length} of 1,284 items</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-7 h-7 rounded-lg text-[11px] font-bold cursor-pointer border transition-all ${n === 1 ? 'bg-[var(--primary-container)] text-white border-[var(--primary-container)]' : 'bg-transparent text-[var(--on-surface-variant)] border-[var(--border)] hover:border-[var(--primary)]'}`}>{n}</button>
            ))}
          </div>
        </div>
      </GCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MOVEMENTS
// ─────────────────────────────────────────────────────────────
export function MovementsPage() {
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = () => {
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 3000)
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h2 className="font-sora text-2xl font-bold">Equipment Movements</h2>
        <p className="text-sm text-[var(--on-surface-variant)] mt-1">Register exits and monitor equipment circulation in real-time.</p>
      </div>

      {confirmed && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,200,83,.1)] border border-[rgba(0,200,83,.3)] rounded-xl mb-5 slide-down text-sm text-[var(--available)]">
          <Icon name="check_circle" size={18} />
          Saída registrada com sucesso! Sincronizado com Supabase.
        </div>
      )}

      <div className="grid grid-cols-[1fr_300px] gap-5">
        {/* Form */}
        <div>
          <GCard className="mb-5">
            <div className="p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-[.06]"><Icon name="output" size={88} /></div>
              <div className="flex items-center gap-2 mb-5 relative z-10">
                <Icon name="add_circle" size={20} className="text-[var(--primary)]" />
                <span className="font-sora text-base font-semibold">Registrar Nova Saída</span>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Responsável / Equipe</label>
                  <Select icon="person">
                    <option value="">Selecione o integrante...</option>
                    {EQUIPES.map(e => <option key={e.id} value={e.id}>{e.emoji} {e.nome}</option>)}
                  </Select>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Nome do Projeto</label>
                  <Input icon="movie_filter" placeholder="Ex: Comercial Coca-Cola 2024" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Equipamentos (Multi-Seleção)</label>
                  <div className="min-h-[72px] bg-[var(--surface-lowest)] border border-[var(--border)] rounded-lg p-3 flex flex-wrap gap-2 cursor-text focus-within:border-[var(--primary)] transition-colors">
                    <span className="chip">Sony Alpha A7S III — SN: 4920 <button className="ml-1 text-[var(--on-secondary-container)] hover:text-[var(--critical)]">✕</button></span>
                    <span className="chip">Lens 24-70mm GMaster — SN: 8812 <button className="ml-1 text-[var(--on-secondary-container)] hover:text-[var(--critical)]">✕</button></span>
                    <input className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--on-surface)] min-w-[160px] font-[Geist]" placeholder="Buscar por nome ou serial..." />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Data Prevista de Retorno</label>
                  <Input icon="calendar_today" type="date" defaultValue="2026-05-15" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Observações</label>
                  <Input placeholder="Observações adicionais..." />
                </div>
                <div className="col-span-2 flex justify-between items-center pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--on-surface-variant)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--tertiary)] inline-block animate-pulse" />
                    Supabase Sync Ready
                  </div>
                  <Btn variant="primary" size="lg" onClick={handleSubmit}>
                    Registrar Saída <Icon name="send" size={15} />
                  </Btn>
                </div>
              </div>
            </div>
          </GCard>

          {/* Recent movements table */}
          <GCard>
            <GCardHead>
              <GCardTitle><Icon name="history" size={15} />Recent Movements</GCardTitle>
              <div className="flex gap-2">
                <Btn variant="ghost" size="sm"><Icon name="filter_alt" size={14} />Filter</Btn>
                <Btn variant="ghost" size="sm"><Icon name="download" size={14} />Export</Btn>
              </div>
            </GCardHead>
            <Table headers={['Date/Time', 'Type', 'Responsible', 'Project', 'Items', 'Status']}>
              {MOVIMENTACOES.map(m => (
                <TR key={m.id}>
                  <TD>
                    <div className="font-mono-data text-xs">{m.data}</div>
                    <div className="text-[10px] text-[var(--on-surface-variant)]">{m.hora}</div>
                  </TD>
                  <TD>
                    <span className={`flex items-center gap-1 text-[11px] font-bold ${m.tipo === 'CHECK-OUT' ? 'text-[var(--primary)]' : 'text-[var(--tertiary)]'}`}>
                      <Icon name={m.tipo === 'CHECK-OUT' ? 'arrow_upward' : 'arrow_downward'} size={14} />
                      {m.tipo}
                    </span>
                  </TD>
                  <TD><span className="text-sm">{m.responsavel}</span></TD>
                  <TD><span className="text-sm">{m.projeto}</span></TD>
                  <TD>
                    <div className="flex gap-1">
                      {m.itens.slice(0, 2).map((item, i) => (
                        <div key={i} className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface-container)] flex items-center justify-center">
                          <Icon name="videocam" size={14} className="text-[var(--on-surface-variant)]" />
                        </div>
                      ))}
                      {m.itens.length > 2 && (
                        <div className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface-container)] flex items-center justify-center text-[10px] font-bold">+{m.itens.length - 2}</div>
                      )}
                    </div>
                  </TD>
                  <TD>
                    {m.status === 'Processing' ? (
                      <span className="flex items-center gap-1 text-[10px] text-[var(--on-surface-variant)]">
                        <Icon name="sync" size={13} className="animate-spin" />Processing...
                      </span>
                    ) : (
                      <Badge variant="avail">Sync Success</Badge>
                    )}
                  </TD>
                </TR>
              ))}
            </Table>
            <div className="px-4 py-3 bg-[var(--surface-low)] border-t border-[var(--border)] flex justify-between items-center">
              <span className="text-xs text-[var(--on-surface-variant)]">Showing {MOVIMENTACOES.length} of 1,248 movements</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(n => (
                  <button key={n} className={`w-7 h-7 rounded-lg text-[11px] font-bold cursor-pointer border transition-all ${n === 1 ? 'bg-[var(--primary-container)] text-white border-[var(--primary-container)]' : 'bg-transparent text-[var(--on-surface-variant)] border-[var(--border)]'}`}>{n}</button>
                ))}
              </div>
            </div>
          </GCard>
        </div>

        {/* Sidebar context */}
        <div className="flex flex-col gap-4">
          <GCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="priority_high" size={18} className="text-[var(--tertiary)]" />
              <span className="font-sora text-sm font-semibold">Critical Returns</span>
            </div>
            <div className="bg-[rgba(234,8,61,.08)] border border-[rgba(234,8,61,.25)] rounded-lg p-3 flex justify-between items-center mb-2">
              <div>
                <div className="text-xs font-bold text-[var(--primary)]">RED Komodo 6K</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]">Delayed: 2 Days</div>
              </div>
              <Btn variant="notify" size="sm">NOTIFY</Btn>
            </div>
            <div className="bg-[var(--surface-lowest)] border border-[var(--border)] rounded-lg p-3 flex justify-between items-center opacity-60">
              <div>
                <div className="text-xs font-semibold">DJI Ronin RS3</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--on-surface-variant)]">Due: Today 18:00</div>
              </div>
              <Icon name="schedule" size={18} className="text-[var(--on-surface-variant)]" />
            </div>
          </GCard>

          <GCard className="p-4">
            <div className="font-sora text-sm font-semibold mb-4">Stock Utilization</div>
            {[['Cameras', 85, 'var(--primary)'], ['Lighting', 42, 'var(--tertiary)'], ['Audio', 12, 'var(--available)']].map(([label, pct, color]) => (
              <div key={label as string} className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--on-surface-variant)]">{label}</span>
                  <span className="font-bold" style={{ color: color as string }}>{pct}%</span>
                </div>
                <ProgBar pct={pct as number} color={color as string} />
              </div>
            ))}
          </GCard>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CHECKOUT HISTORY
// ─────────────────────────────────────────────────────────────
export function HistoryPage() {
  const [tipo, setTipo] = useState('ALL')
  const filtered = MOVIMENTACOES.filter(m => tipo === 'ALL' || m.tipo === tipo)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-sora text-2xl font-bold">Checkout History</h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Histórico completo de todas as movimentações.</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" size="sm"><Icon name="file_download" size={14} />Excel</Btn>
          <Btn variant="ghost" size="sm"><Icon name="picture_as_pdf" size={14} />PDF</Btn>
        </div>
      </div>

      <GCard>
        <GCardHead>
          <div className="flex gap-2">
            {['ALL', 'CHECK-OUT', 'CHECK-IN'].map(t => (
              <button key={t} onClick={() => setTipo(t)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase cursor-pointer border transition-all ${tipo === t ? 'bg-[var(--primary-container)] text-white border-[var(--primary-container)]' : 'bg-transparent text-[var(--on-surface-variant)] border-[var(--border)] hover:border-[var(--primary)]'}`}>
                {t}
              </button>
            ))}
          </div>
          <Input placeholder="Search..." className="w-44 text-xs py-1.5" />
        </GCardHead>
        <Table headers={['Data / Hora', 'Tipo', 'Equipe', 'Responsável', 'Projeto', 'Itens', 'Status']}>
          {filtered.map(m => {
            const eq = getEq(m.equipe)
            return (
              <TR key={m.id}>
                <TD><div className="font-mono-data text-xs">{m.data}</div><div className="text-[10px] text-[var(--on-surface-variant)]">{m.hora}</div></TD>
                <TD><span className={`flex items-center gap-1 text-[11px] font-bold ${m.tipo === 'CHECK-OUT' ? 'text-[var(--primary)]' : 'text-[var(--tertiary)]'}`}><Icon name={m.tipo === 'CHECK-OUT' ? 'arrow_upward' : 'arrow_downward'} size={13} />{m.tipo}</span></TD>
                <TD><span className="text-sm">{eq?.emoji} {eq?.nome}</span></TD>
                <TD><span className="text-sm">{m.responsavel}</span></TD>
                <TD><span className="text-xs text-[var(--on-surface-variant)]">{m.projeto}</span></TD>
                <TD><span className="text-xs text-[var(--on-surface-variant)]">{m.itens.join(', ')}</span></TD>
                <TD>{m.status === 'Processing' ? <span className="flex items-center gap-1 text-[10px] text-[var(--on-surface-variant)]"><Icon name="sync" size={12} className="animate-spin" />Processing</span> : <Badge variant="avail">OK</Badge>}</TD>
              </TR>
            )
          })}
        </Table>
      </GCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────────────────────
export function MaintenancePage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-sora text-2xl font-bold">Maintenance Log</h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Controle preventivo e corretivo do acervo.</p>
        </div>
        <Btn variant="primary"><Icon name="add" size={16} />Agendar Manutenção</Btn>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Stat4 label="Em Manutenção" value="30" color="var(--critical)" />
        <Stat4 label="Agendados" value="12" color="var(--warning)" />
        <Stat4 label="Concluídos (mês)" value="47" color="var(--available)" />
      </div>

      <GCard>
        <GCardHead><GCardTitle><Icon name="build" size={15} />Equipamentos em Manutenção</GCardTitle></GCardHead>
        <Table headers={['Equipamento', 'Tipo', 'Técnico', 'Data Entrada', 'Previsão', 'Status']}>
          {MANUTENCOES.map(m => {
            const statusV = m.status === 'CONCLUÍDO' ? 'avail' : m.status === 'URGENTE' ? 'crit' : 'warn'
            return (
              <TR key={m.id}>
                <TD><span className="font-semibold text-sm">{m.equip}</span></TD>
                <TD><span className="text-xs text-[var(--on-surface-variant)]">{m.tipo}</span></TD>
                <TD><span className="text-sm">{m.tecnico}</span></TD>
                <TD><span className="font-mono-data text-xs">{m.entrada}</span></TD>
                <TD><span className="font-mono-data text-xs">{m.previsao}</span></TD>
                <TD><Badge variant={statusV}>{m.status}</Badge></TD>
              </TR>
            )
          })}
        </Table>
      </GCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TEAMS
// ─────────────────────────────────────────────────────────────
export function TeamsPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="font-sora text-2xl font-bold">Team Management</h2>
          <p className="text-sm text-[var(--on-surface-variant)] mt-1">Gerencie as equipes de campo e suas alocações.</p>
        </div>
        <Btn variant="primary" onClick={() => setShowModal(true)}><Icon name="add" size={16} />Nova Equipe</Btn>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {EQUIPES.map(eq => {
          const movs = MOVIMENTACOES.filter(m => m.equipe === eq.id && !m.retornado)
          const pend = PENDENTES.filter(p => p.equipe === eq.id)
          return (
            <div key={eq.id} className="glass-card overflow-hidden" style={{ borderTop: `3px solid ${eq.cor}` }}>
              <div className="flex items-center gap-3 p-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: eq.cor + '22' }}>{eq.emoji}</div>
                <div>
                  <div className="font-sora text-sm font-semibold">{eq.nome}</div>
                  <div className="text-[11px] text-[var(--on-surface-variant)]">{eq.membros}</div>
                </div>
              </div>
              <div className="grid grid-cols-2" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="text-center py-3 border-r border-[var(--border)]">
                  <div className="font-sora text-2xl font-bold" style={{ color: eq.cor }}>{pend.length}</div>
                  <div className="text-[9px] uppercase tracking-wider text-[var(--on-surface-variant)]">Em Campo</div>
                </div>
                <div className="text-center py-3">
                  <div className="font-sora text-2xl font-bold">{movs.length + 5}</div>
                  <div className="text-[9px] uppercase tracking-wider text-[var(--on-surface-variant)]">Saídas Totais</div>
                </div>
              </div>
              <div className="p-3 flex gap-2">
                <Btn variant="ghost" size="sm" className="flex-1 justify-center"><Icon name="edit" size={14} />Editar</Btn>
                <Btn variant="crit" size="sm"><Icon name="delete" size={14} /></Btn>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal faux */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="font-sora text-lg font-bold mb-5">Nova Equipe</div>
            <div className="flex flex-col gap-4">
              <div><label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Nome da Equipe</label><Input placeholder="Ex.: Equipe Delta" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Emoji</label><Input placeholder="🎬" /></div>
                <div><label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Cor</label><input type="color" defaultValue="#EA083D" className="w-full h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-lowest)] cursor-pointer p-1" /></div>
              </div>
              <div><label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Membros</label><Input placeholder="Nomes separados por vírgula" /></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Btn>
              <Btn variant="primary" onClick={() => setShowModal(false)}>Salvar Equipe</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────
export function SettingsPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h2 className="font-sora text-2xl font-bold">Settings</h2>
        <p className="text-sm text-[var(--on-surface-variant)] mt-1">Configurações do sistema LensCtrl.</p>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-5">
        <GCard className="p-4 h-fit">
          <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] mb-3">Configurações</div>
          {[['cloud', 'Supabase / Cloud', true], ['palette', 'Aparência', false], ['notifications', 'Notificações', false], ['lock', 'Segurança', false], ['group', 'Usuários', false]].map(([icon, label, active]) => (
            <button key={label as string} className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 border-none cursor-pointer text-left ${active ? 'active' : 'text-[var(--on-surface-variant)]'}`}>
              <Icon name={icon as string} size={18} fill={!!active} />
              <span>{label}</span>
            </button>
          ))}
        </GCard>

        <GCard className="p-5">
          <div className="font-sora text-base font-semibold mb-5">Conexão Supabase</div>
          <div className="flex items-center gap-3 px-4 py-3 bg-[rgba(0,200,83,.08)] border border-[rgba(0,200,83,.2)] rounded-xl mb-5">
            <span className="dot dot-avail" />
            <span className="text-sm text-[var(--available)] font-semibold">Conectado — Supabase Pro</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Supabase URL</label>
              <Input placeholder="https://xxxxx.supabase.co" defaultValue="https://izwrbwy...supabase.co" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--on-surface-variant)] block mb-1.5">Anon Key</label>
              <Input type="password" defaultValue="eyJhbGciOiJIUzI1Ni..." />
            </div>
            <div className="col-span-2 pt-4 border-t border-[var(--border)] flex justify-end gap-3">
              <Btn variant="ghost">Testar Conexão</Btn>
              <Btn variant="primary">Salvar Alterações</Btn>
            </div>
          </div>
        </GCard>
      </div>
    </div>
  )
}
