import './App.css';
import './Sidebar.css';
import logo from './logo.png';
import Sidebar from './Sidebar';
import Login from './Login';
import { useState } from 'react';

function App() {
  // Track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login />;
  }

  // Sample data - shows your dashboard is active
  const totalInstructors = 12;
  const totalSchools = 5;
  const activePlacements = 8;
  const pendingRequests = 3;

  const recentActivities = [
    { id: 1, action: 'New instructor assigned', name: 'John Doe', school: 'Sunshine Academy', time: '2 hours ago' },
    { id: 2, action: 'Placement completed', name: 'Mary Smith', school: 'Bright Future School', time: '5 hours ago' },
    { id: 3, action: 'New school registered', name: 'Grace International School', school: '', time: '1 day ago' },
    { id: 4, action: 'Instructor availability updated', name: 'Peter Johnson', school: 'Hilltop School', time: '2 days ago' },
  ];

  return (
    <div className="App">
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <img src={logo} alt="LabelReach Logo" className="header-logo" />
            <h1 className="header-title">LabelReach Instructor System</h1>
          </div>
          <p className="header-subtitle">Manage your instructors and schools</p>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-card">
            <h2 className="welcome-title">Welcome, Emmanuel! 👋</h2>
            <p className="welcome-text">
              You have <strong>{totalInstructors}</strong> instructors, 
              <strong> {totalSchools}</strong> schools, and 
              <strong> {activePlacements}</strong> active placements.
            </p>
            <p className="welcome-text-small">
              📋 You have <strong>{pendingRequests}</strong> pending requests
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card stat-card-red">
            <h3 className="stat-number">{totalInstructors}</h3>
            <p className="stat-label">Total Instructors</p>
            <span className="stat-change">↑ 2 this month</span>
          </div>
          <div className="stat-card stat-card-gold">
            <h3 className="stat-number">{totalSchools}</h3>
            <p className="stat-label">Total Schools</p>
            <span className="stat-change">↑ 1 this month</span>
          </div>
          <div className="stat-card stat-card-gold">
            <h3 className="stat-number">{activePlacements}</h3>
            <p className="stat-label">Active Placements</p>
            <span className="stat-change">↑ 3 this month</span>
          </div>
          <div className="stat-card stat-card-red">
            <h3 className="stat-number">{pendingRequests}</h3>
            <p className="stat-label">Pending Requests</p>
            <span className="stat-change">⚠️ Needs attention</span>
          </div>
        </div>

        {/* Recent Activity */}
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

        {/* Footer */}
        <div className="footer">
          <p>© 2026 LabelReach Advertising Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;