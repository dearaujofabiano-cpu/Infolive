import { useState } from 'react'
import LoginPage from './pages/Login'
import Topbar from './components/Topbar'
import Sidebar, { type Page } from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import { InventoryPage, MovementsPage, HistoryPage, MaintenancePage, TeamsPage, SettingsPage } from './pages/Pages'
import { Icon } from './components/ui'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState<Page>('dashboard')

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard setPage={setPage} />
      case 'inventory': return <InventoryPage />
      case 'movements': return <MovementsPage />
      case 'history': return <HistoryPage />
      case 'maintenance': return <MaintenancePage />
      case 'teams': return <TeamsPage />
      case 'settings': return <SettingsPage />
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar page={page} setPage={setPage} />
        <main className="flex-1 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
      <button
        className="fab"
        onClick={() => setPage('movements')}
        title="Nova Saída"
      >
        <Icon name="add" size={28} />
      </button>
    </div>
  )
}
