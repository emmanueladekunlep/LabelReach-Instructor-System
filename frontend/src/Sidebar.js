import './Sidebar.css';

function Sidebar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'instructors', label: '👨‍🏫 Instructors' },
    { id: 'schools', label: '🏫 Schools' },
    { id: 'placements', label: '📅 Placements' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h3>📋 LabelReach</h3>
        <p>Instructor System</p>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'nav-item-active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <span>🚪 Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;