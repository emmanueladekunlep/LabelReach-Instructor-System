function Schools({ schools }) {
  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#70000' }}>🏫 Schools</h2>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1A1A2E', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>City</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{school.name}</td>
                <td style={{ padding: '12px' }}>{school.city}</td>
                <td style={{ padding: '12px' }}>{school.phone}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: school.isActive ? '#e8f5e9' : '#fce4ec',
                    color: school.isActive ? '#2e7d32' : '#c62828',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                    {school.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schools;