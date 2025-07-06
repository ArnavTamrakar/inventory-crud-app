import { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import EditUser from './EditUser';

function SafeToggle() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the default form submission (page reload)
    fetch("/api/users", { // Sends a POST request to the backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tells backend to expect JSON
      },
      body: JSON.stringify({name,email}) // Sends the 'name' as JSON in the request body
    })
    .then(response => response.json()) // Parses the JSON response
    .then(data => {
      console.log('User added to database:', data) // Logs the response
      setName('')
      setEmail('') // Clears the input field (assuming setName is a state setter)
    })
    .catch(error => console.error('Error:', error)) // Handles any errors
  }
  
  useEffect (()=> {
    fetch("/api/users")
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error:', error))
  }, [])

  
  const handleEdit = (userId, newData) => {
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('User updated:', data)
      // Refresh the users list
      fetch("/api/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error))
  }

  const handleDelete = (userId) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log('User deleted:', data);
      // Refresh the users list after deletion
      fetch("/api/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error deleting user:', error));
  }

  return (
   <div>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Add User</button>
    </form>
    {users.map(user => (
      <Card key={user._id} sx={{ marginBottom: 2 }}>
        <CardContent>
                      <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            <button onClick={() => setEditingUser(user._id)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
        </CardContent>
              </Card>
      ))}
      
      {/* Show EditUser component when editing */}
      {editingUser && (
        <EditUser 
          userId={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleEdit}
        />
      )}
   </div>
  );
}

export default SafeToggle
