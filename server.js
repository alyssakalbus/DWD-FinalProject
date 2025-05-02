const path = require('path');
const express = require('express');
const config = require('./config.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/users');

const app = express();
const port = config.PORT || 3000;
const saltRounds = 10;  // bcrypt salt rounds

// Handle data
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// server
app.use(express.static(publicURL));

function encryptDNA(dna) {
    return dna
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}

mongoose.connect(config.MONGODB_URI || 'mongodb://localhost:27017/dwd-finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Get All Users
app.get("/api/v1/users", async (req, res) => {
    try {
        const data = await User.find();
        res.json({data})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// Get Single User
app.get("/api/v1/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            encryptedSequence: user.encryptedSequence
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Login User
app.post('/api/v1/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        res.json({
            userId: user._id,
            name: user.name,
            email: user.email,
            encryptedSequence: user.encryptedSequence,
            message: 'Login successful'
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create a new user with hashed password and encrypted DNA sequence
app.post('/api/v1/users', async (req, res) => {
    try {
        const { name, email, birthday, dnaSequence, password } = req.body;

        if (!password || password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const encrypted = encryptDNA(dnaSequence);

        const newUser = await User.create({
            name,
            email,
            birthday,
            dnaSequence,
            encryptedSequence: encrypted,
            password: hashedPassword
        });

        res.json({
            id: newUser._id,
            encryptedSequence: newUser.encryptedSequence,
            message: "DNA successfully encoded and stored."
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user info
app.put("/api/v1/users/:id", async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            birthday: req.body.birthday
        };

        const data = await User.findOneAndUpdate(
            { _id: req.params.id },
            updatedData,
            { new: true }
        );

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete user
app.delete("/api/v1/users/:id", async (req, res) => {
    try {
        const deletedDocument = await User.findOneAndDelete({ _id: req.params.id });
        res.json({
            message: "Successfully removed item",
            data: deletedDocument
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Clear the database (only in development mode)
app.delete('/api/v1/clear-database', async (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        try {
            await User.deleteMany({});
            
            res.json({ message: 'Database cleared successfully' });
        } catch (error) {
            console.error('Error clearing database:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(403).json({ error: 'This operation is not allowed in production' });
    }
});

// Logout function
app.post('/api/v1/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

// multipage routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/services.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.get('/lab', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/lab.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pricing.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/signup.html'));
});

// listen on port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});