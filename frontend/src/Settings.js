function Settings() {
  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#70000' }}>⚙️ Settings</h2>
      
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginTop: '20px',
        maxWidth: '600px'
      }}>
        <h3 style={{ color: '#1A1A2E' }}>Profile Settings</h3>
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              value="Emmanuel Adekunle Peace"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              value="emmanueladekunlep@gmail.com"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <button
            style={{
              background: '#70000',
              color: 'white',
              border: 'none',
              padding: '10px 30px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginTop: '20px',
        maxWidth: '600px'
      }}>
        <h3 style={{ color: '#1A1A2E' }}>System Information</h3>
        <p><strong>Version:</strong> 1.0.0</p>
        <p><strong>Database:</strong> PostgreSQL</p>
        <p><strong>API:</strong> Running on port 5001</p>
        <p><strong>Frontend:</strong> React</p>
      </div>
    </div>
  );
}

export default Settings;