import './App.css';
import './Sidebar.css';
import logo from './logo.png';
import Sidebar from './Sidebar';
import Instructors from './Instructors';
import Schools from './Schools';
import Placements from './Placements';
import Settings from './Settings';
import Login from './Login';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [stats, setStats] = useState({
    totalInstructors: 0,
    totalSchools: 0,
    activePlacements: 0,
    pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const recentActivities = [
    { id: 1, action: 'New instructor assigned', name: 'John Doe', school: 'Sunshine Academy', time: '2 hours ago' },
    { id: 2, action: 'Placement completed', name: 'Mary Smith', school: 'Bright Future School', time: '5 hours ago' },
    { id: 3, action: 'New school registered', name: 'Grace International School', school: '', time: '1 day ago' },
    { id: 4, action: 'Instructor availability updated', name: 'Peter Johnson', school: 'Hilltop School', time: '2 days ago' },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'instructors':
        return <Instructors />;
      case 'schools':
        return <Schools />;
      case 'placements':
        return <Placements />;
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
                <a href="#" className="view-all">View All →</a>
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

  if (loading) {
    return (
      <div className="App">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
        <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

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