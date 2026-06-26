import './App.css';
import './Sidebar.css';
import logo from './logo.png';
import Sidebar from './Sidebar';
import Instructors from './Instructors';
import Schools from './Schools';
import Placements from './Placements';
import Settings from './Settings';
import Login from './Login';
import { useState } from 'react';

// Hardcoded demo data – this is what makes the app work without a backend
const DEMO_DATA = {
  instructors: [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', phone: '080-123-4567', specialization: 'Python', isAvailable: true },
    { id: 2, firstName: 'Mary', lastName: 'Smith', email: 'mary.smith@email.com', phone: '080-234-5678', specialization: 'Web Dev', isAvailable: true },
    { id: 3, firstName: 'Peter', lastName: 'Johnson', email: 'peter.johnson@email.com', phone: '080-345-6789', specialization: 'Data Analysis', isAvailable: true }
  ],
  schools: [
    { id: 1, name: 'Sunshine Academy', address: '123 Education Street', city: 'Lagos', phone: '01-234-5678', email: 'info@sunshineacademy.com', isActive: true }
  ],
  placements: [
    { id: 1, instructorId: 1, schoolId: 1, startDate: '2026-06-01', endDate: null, status: 'active', notes: 'John teaching Python at Sunshine Academy' }
  ]
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const stats = {
    totalInstructors: DEMO_DATA.instructors.length,
    totalSchools: DEMO_DATA.schools.length,
    activePlacements: DEMO_DATA.placements.filter(p => p.status === 'active').length,
    pendingRequests: 3
  };

  const recentActivities = [
    { id: 1, action: 'New instructor assigned', name: 'John Doe', school: 'Sunshine Academy', time: '2 hours ago' },
    { id: 2, action: 'Placement completed', name: 'Mary Smith', school: 'Bright Future School', time: '5 hours ago' },
    { id: 3, action: 'New school registered', name: 'Grace International School', school: '', time: '1 day ago' },
    { id: 4, action: 'Instructor availability updated', name: 'Peter Johnson', school: 'Hilltop School', time: '2 days ago' },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'instructors':
        return <Instructors instructors={DEMO_DATA.instructors} />;
      case 'schools':
        return <Schools schools={DEMO_DATA.schools} />;
      case 'placements':
        return <Placements placements={DEMO_DATA.placements} instructors={DEMO_DATA.instructors} schools={DEMO_DATA.schools} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <div className="welcome-section">
              <div className="welcome-card">
                <h2 className="welcome-title">Welcome, Emmanuel! 👋</h2>
                <p className="welcome-text">
                  You have <strong>{stats.totalInstructors}</strong> instructors, 
                  <strong> {stats.totalSchools}</strong> schools, and 
                  <strong> {stats.activePlacements}</strong> active placements.
                </p>
                <p className="welcome-text-small">
                  📋 You have <strong>{stats.pendingRequests}</strong> pending requests
                </p>
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-card stat-card-red">
                <h3 className="stat-number">{stats.totalInstructors}</h3>
                <p className="stat-label">Total Instructors</p>
                <span className="stat-change">↑ 3 this month</span>
              </div>
              <div className="stat-card stat-card-gold">
                <h3 className="stat-number">{stats.totalSchools}</h3>
                <p className="stat-label">Total Schools</p>
                <span className="stat-change">↑ 1 this month</span>
              </div>
              <div className="stat-card stat-card-gold">
                <h3 className="stat-number">{stats.activePlacements}</h3>
                <p className="stat-label">Active Placements</p>
                <span className="stat-change">↑ 1 this month</span>
              </div>
              <div className="stat-card stat-card-red">
                <h3 className="stat-number">{stats.pendingRequests}</h3>
                <p className="stat-label">Pending Requests</p>
                <span className="stat-change">⚠️ Needs attention</span>
              </div>
            </div>

            <div className="activity-section">
              <div className="activity-header">
                <h3>📊 Recent Activity</h3>
                <button className="view-all" style={{ background: 'none', border: 'none', color: '#70000', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>View All →</button>
              </div>
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">📌</div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-detail">
                        {activity.name} {activity.school && `at ${activity.school}`}
                      </p>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      
      <div className="main-content">
        <div className="header">
          <div className="header-content">
            <img src={logo} alt="LabelReach Logo" className="header-logo" />
            <h1 className="header-title">LabelReach Instructor System</h1>
          </div>
          <p className="header-subtitle">Manage your instructors and schools</p>
        </div>

        {renderPage()}

        <div className="footer">
          <p>© 2026 LabelReach Advertising Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;