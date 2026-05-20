import { useState } from 'react'
import { Icon, Btn } from '../components/ui'

const DEMO_USERS = [
  { id: 'IL-000001', name: 'Luiz Gustavo Santos', role: 'Admin', emoji: '👑' },
  { id: 'IL-000042', name: 'Carlos Silva', role: 'Cameraman', emoji: '🎬' },
  { id: 'IL-000031', name: 'Maria Oliveira', role: 'Diretora de Arte', emoji: '📸' },
]

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [empId, setEmpId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!empId || !password) { setError('Preencha o Employee ID e a senha.'); return }
    if (password !== '123456') { setError('Senha incorreta. (Demo: use 123456)'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden">
      {/* BG overlay */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(10,12,16,.85), rgba(10,12,16,.97)), url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }} />

      {/* Bottom gradient line */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 z-10" style={{ background: 'linear-gradient(to right, var(--primary-container), var(--tertiary), var(--warning))', opacity: .4 }} />

      <div className="relative z-10 w-full max-w-[400px] mx-4">
        {/* Card */}
        <div className="glass rounded-2xl p-7 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <div className="bg-[var(--primary-container)] px-4 py-2 rounded-lg mb-3">
              <span className="font-sora text-2xl font-bold text-white tracking-widest">INFOLIVE</span>
            </div>
            <h1 className="font-sora text-xl font-semibold text-[var(--primary)]">Inventory Management</h1>
            <p className="text-[10px] tracking-[.25em] uppercase text-[var(--on-surface-variant)] mt-1">Cinematic Utility Suite</p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--secondary)] block mb-1.5">Employee ID</label>
              <div className="relative">
                <Icon name="badge" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                <input
                  type="text"
                  value={empId}
                  onChange={e => setEmpId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="IL-000000"
                  className="w-full h-12 bg-[var(--surface-lowest)] border border-[var(--border)] rounded-xl pl-10 pr-4 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--tertiary)] transition-colors font-mono-data font-[Geist]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-bold tracking-wider uppercase text-[var(--secondary)]">Password</label>
                <button className="text-[11px] text-[var(--primary)] hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Icon name="lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full h-12 bg-[var(--surface-lowest)] border border-[var(--border)] rounded-xl pl-10 pr-12 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--tertiary)] transition-colors font-[Geist]"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors">
                  <Icon name={showPass ? 'visibility_off' : 'visibility'} size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-[var(--primary-container)]" />
              <label htmlFor="remember" className="text-xs text-[var(--on-surface-variant)] select-none">Remember this device</label>
            </div>

            {error && (
              <div className="bg-[rgba(234,8,61,.1)] border border-[rgba(234,8,61,.3)] rounded-xl px-4 py-2.5 text-xs text-[var(--critical)]">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-14 bg-[var(--primary-container)] text-white font-sora text-base font-bold rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[.98] transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <><Icon name="sync" size={20} className="animate-spin" />Autenticando...</>
              ) : (
                <>Login <Icon name="arrow_forward" size={20} /></>
              )}
            </button>
          </div>

          {/* Demo users */}
          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <div className="text-[10px] font-bold tracking-wider text-[var(--on-surface-variant)] uppercase mb-3">Usuários Demo (senha: 123456)</div>
            <div className="flex flex-col gap-1.5">
              {DEMO_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => { setEmpId(u.id); setPassword('123456') }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--surface-high)] transition-colors text-left cursor-pointer border-none bg-transparent"
                >
                  <span className="text-lg">{u.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-[var(--on-surface)]">{u.name}</div>
                    <div className="font-mono-data text-[10px] text-[var(--on-surface-variant)]">{u.id} — {u.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-[var(--border)] flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]">
              <span className="dot dot-avail" />System Online
            </div>
            <span className="text-[11px] text-[var(--on-surface-variant)]">v1.0.4-LATEST</span>
          </div>
        </div>
      </div>
    </div>
  )
}
