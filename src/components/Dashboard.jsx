import Header from './Header.jsx'
import StatsCards from './StatsCards.jsx'
import ChartSection from './ChartSection.jsx'
import UsersTable from './UsersTable.jsx'

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__content">
        <div className="dashboard-widgets">
          <StatsCards />
          <ChartSection />
          <UsersTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
