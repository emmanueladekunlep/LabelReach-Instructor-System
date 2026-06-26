import { useState, useEffect } from 'react';

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPlacement, setNewPlacement] = useState({
    instructorId: '',
    schoolId: '',
    startDate: '',
    endDate: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    // Fetch all data
    Promise.all([
      fetch('http://localhost:5001/api/placements').then(res => res.json()),
      fetch('http://localhost:5001/api/instructors').then(res => res.json()),
      fetch('http://localhost:5001/api/schools').then(res => res.json())
    ])
      .then(([placementsData, instructorsData, schoolsData]) => {
        setPlacements(placementsData);
        setInstructors(instructorsData);
        setSchools(schoolsData);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, []);

  const addPlacement = () => {
    fetch('http://localhost:5001/api/placements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlacement)
    })
      .then(res => res.json())
      .then(data => {
        setPlacements([...placements, data]);
        setShowForm(false);
        setNewPlacement({ instructorId: '', schoolId: '', startDate: '', endDate: '', status: 'active', notes: '' });
      })
      .catch(err => console.log('Error:', err));
  };

  const deletePlacement = (id) => {
    if (window.confirm('Delete this placement?')) {
      fetch(`http://localhost:5001/api/placements/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setPlacements(placements.filter(p => p.id !== id));
        })
        .catch(err => console.log('Error:', err));
    }
  };

  const getInstructorName = (id) => {
    const inst = instructors.find(i => i.id === id);
    return inst ? `${inst.firstName} ${inst.lastName}` : 'Unknown';
  };

  const getSchoolName = (id) => {
    const school = schools.find(s => s.id === id);
    return school ? school.name : 'Unknown';
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading placements...</div>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#70000' }}>📅 Placements</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#70000',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          + Add Placement
        </button>
      </div>

      {showForm && (
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#70000' }}>New Placement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <select
              value={newPlacement.instructorId}
              onChange={(e) => setNewPlacement({...newPlacement, instructorId: parseInt(e.target.value)})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="">Select Instructor</option>
              {instructors.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.firstName} {inst.lastName}</option>
              ))}
            </select>
            <select
              value={newPlacement.schoolId}
              onChange={(e) => setNewPlacement({...newPlacement, schoolId: parseInt(e.target.value)})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="">Select School</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Start Date"
              value={newPlacement.startDate}
              onChange={(e) => setNewPlacement({...newPlacement, startDate: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="date"
              placeholder="End Date"
              value={newPlacement.endDate}
              onChange={(e) => setNewPlacement({...newPlacement, endDate: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <select
              value={newPlacement.status}
              onChange={(e) => setNewPlacement({...newPlacement, status: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Notes"
              value={newPlacement.notes}
              onChange={(e) => setNewPlacement({...newPlacement, notes: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button
              onClick={addPlacement}
              style={{
                background: '#70000',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#1A1A2E', color: 'white' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Instructor</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>School</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Start Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
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
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => deletePlacement(placement.id)}
                    style={{
                      background: '#c62828',
                      color: 'white',
                      border: 'none',
                      padding: '5px 15px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
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