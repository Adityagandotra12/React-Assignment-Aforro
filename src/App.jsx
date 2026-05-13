import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
