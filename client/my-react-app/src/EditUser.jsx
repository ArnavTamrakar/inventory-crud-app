import { useState, useEffect } from 'react';

function EditUser({ userId, onClose, onUpdate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch current user data when component mounts
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        setName(user.name);
        setEmail(user.email);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the update function with new data
    onUpdate(userId, { name, email });
    
    // Close the edit form
    onClose();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        minWidth: '300px'
      }}>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '8px 16px' }}>Save</button>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser; 