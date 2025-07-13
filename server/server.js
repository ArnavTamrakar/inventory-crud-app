const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// Enable CORS for all routes (allows frontend to access backend)
app.use(cors())
// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json())

// Connect to the MongoDB database named 'dbconnect' on localhost
mongoose.connect('mongodb://localhost:27017/dbconnect')
     .then(() => console.log('Connected to MongoDB'))
     .catch(err => console.error('MongoDB connection error:', err)) 

// Define a User model with 'name' and 'email' fields, both as strings
const User = mongoose.model('User', {
    name: String,
    email: String, 
})

// Define a POST endpoint to add a new user
app.post ("/api/users", async (req ,res) => {
    console.log('POST request received:', req.body)
    try {
        const user = new User(req.body) 
        console.log('User object created:', user)
        await user.save() 
        console.log('User saved to database') 
        res.json({ message: "User added", user})
    } catch (error) {
        console.error('Error saving user:', error) 
        res.status(500).json({ message: "Error adding user", error: error.message}) 
    }
})

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message})
    }
});

app.put("/api/users/:id", async (req,res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        
        if (!updateduser) {
            return res.status(404).json({message: "User not found"})
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({message: "Error updating user", error: error.message });
    };
})

app.delete("/api/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({message: "Error deleting user", error: error.message});
    }
})
// Start the server and listen on port 5000
app.listen(5000, () => {console.log("Server has started")})