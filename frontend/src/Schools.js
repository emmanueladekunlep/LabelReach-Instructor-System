import { useState, useEffect } from 'react';

function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    isActive: true
  });

  useEffect(() => {
    fetch('http://localhost:5001/api/schools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, []);

  const addSchool = () => {
    fetch('http://localhost:5001/api/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchool)
    })
      .then(res => res.json())
      .then(data => {
        setSchools([...schools, data]);
        setShowForm(false);
        setNewSchool({ name: '', address: '', city: '', phone: '', email: '', isActive: true });
      })
      .catch(err => console.log('Error:', err));
  };

  const deleteSchool = (id) => {
    if (window.confirm('Delete this school?')) {
      fetch(`http://localhost:5001/api/schools/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setSchools(schools.filter(school => school.id !== id));
        })
        .catch(err => console.log('Error:', err));
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading schools...</div>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#70000' }}>🏫 Schools</h2>
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
          + Add School
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
          <h3 style={{ color: '#70000' }}>New School</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="School Name"
              value={newSchool.name}
              onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="Address"
              value={newSchool.address}
              onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="City"
              value={newSchool.city}
              onChange={(e) => setNewSchool({...newSchool, city: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newSchool.phone}
              onChange={(e) => setNewSchool({...newSchool, phone: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newSchool.email}
              onChange={(e) => setNewSchool({...newSchool, email: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label>Active:</label>
              <input
                type="checkbox"
                checked={newSchool.isActive}
                onChange={(e) => setNewSchool({...newSchool, isActive: e.target.checked})}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button
              onClick={addSchool}
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
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>City</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
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
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => deleteSchool(school.id)}
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

export default Schools;