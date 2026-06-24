import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h3>📋 LabelReach</h3>
        <p>Instructor System</p>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item nav-item-active">
          <span>🏠</span> Dashboard
        </div>
        <div className="nav-item">
          <span>👨‍🏫</span> Instructors
        </div>
        <div className="nav-item">
          <span>🏫</span> Schools
        </div>
        <div className="nav-item">
          <span>📅</span> Placements
        </div>
        <div className="nav-item">
          <span>📊</span> Reports
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <span>⚙️</span> Settings
        </div>
        <div className="nav-item">
          <span>🚪</span> Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;