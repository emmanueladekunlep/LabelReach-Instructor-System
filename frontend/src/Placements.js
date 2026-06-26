function Placements({ placements, instructors, schools }) {
  const getInstructorName = (id) => {
    const inst = instructors.find(i => i.id === id);
    return inst ? `${inst.firstName} ${inst.lastName}` : 'Unknown';
  };

  const getSchoolName = (id) => {
    const school = schools.find(s => s.id === id);
    return school ? school.name : 'Unknown';
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#70000' }}>📅 Placements</h2>

      <div style={{
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginTop: '20px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1A1A2E', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Instructor</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>School</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Start Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement) => (
              <tr key={placement.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{getInstructorName(placement.instructorId)}</td>
                <td style={{ padding: '12px' }}>{getSchoolName(placement.schoolId)}</td>
                <td style={{ padding: '12px' }}>{new Date(placement.startDate).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: placement.status === 'active' ? '#e8f5e9' : placement.status === 'completed' ? '#e3f2fd' : '#fce4ec',
                    color: placement.status === 'active' ? '#2e7d32' : placement.status === 'completed' ? '#1565c0' : '#c62828',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                    {placement.status}
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

export default Placements;