import { useState, useEffect } from 'react';

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    isAvailable: true
  });

  useEffect(() => {
    fetch('http://localhost:5001/api/instructors')
      .then(res => res.json())
      .then(data => {
        setInstructors(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error:', err);
        setLoading(false);
      });
  }, []);

  const addInstructor = () => {
    fetch('http://localhost:5001/api/instructors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInstructor)
    })
      .then(res => res.json())
      .then(data => {
        setInstructors([...instructors, data]);
        setShowForm(false);
        setNewInstructor({ firstName: '', lastName: '', email: '', phone: '', specialization: '', isAvailable: true });
      })
      .catch(err => console.log('Error:', err));
  };

  const deleteInstructor = (id) => {
    if (window.confirm('Delete this instructor?')) {
      fetch(`http://localhost:5001/api/instructors/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setInstructors(instructors.filter(inst => inst.id !== id));
        })
        .catch(err => console.log('Error:', err));
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading instructors...</div>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#70000' }}>👨‍🏫 Instructors</h2>
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
          + Add Instructor
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
          <h3 style={{ color: '#70000' }}>New Instructor</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="First Name"
              value={newInstructor.firstName}
              onChange={(e) => setNewInstructor({...newInstructor, firstName: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newInstructor.lastName}
              onChange={(e) => setNewInstructor({...newInstructor, lastName: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newInstructor.email}
              onChange={(e) => setNewInstructor({...newInstructor, email: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newInstructor.phone}
              onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newInstructor.specialization}
              onChange={(e) => setNewInstructor({...newInstructor, specialization: e.target.value})}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label>Available:</label>
              <input
                type="checkbox"
                checked={newInstructor.isAvailable}
                onChange={(e) => setNewInstructor({...newInstructor, isAvailable: e.target.checked})}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button
              onClick={addInstructor}
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
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Specialization</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
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
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => deleteInstructor(inst.id)}
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

export default Instructors;