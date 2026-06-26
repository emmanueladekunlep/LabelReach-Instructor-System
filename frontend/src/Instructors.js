function Instructors({ instructors }) {
  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#70000' }}>👨‍🏫 Instructors</h2>
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
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Specialization</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((inst) => (
              <tr key={inst.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{inst.firstName} {inst.lastName}</td>
                <td style={{ padding: '12px' }}>{inst.email}</td>
                <td style={{ padding: '12px' }}>{inst.specialization}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: inst.isAvailable ? '#e8f5e9' : '#fce4ec',
                    color: inst.isAvailable ? '#2e7d32' : '#c62828',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                    {inst.isAvailable ? 'Available' : 'Unavailable'}
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

export default Instructors;