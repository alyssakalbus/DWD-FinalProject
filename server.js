const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const config = require('./config.js');

const port = config.PORT || 3000;

// Handle data
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// server
app.use(express.static(publicURL));

// serve static files from the 'public' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/services.html'));
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


app.get('/apply', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/apply.html'));
});

// Add login POST endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Here you would typically:
    // 1. Validate the credentials
    // 2. Check against a database
    // 3. Create a session
    // For now, we'll just send a response
    res.json({ message: 'Login functionality coming soon' });
});

// API Endpoints w/ CRUD operations

app.get("/api/v1/finalproject", async (req, res) => {
    try {
        const data = await finalproject.find();
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.post("/api/v1/finalproject", async (req, res) => {
    try {
        const newData = {
            // EDIT THIS
            todo: req.body.todo,
            status: req.body.status
        }
        const data = await todos.create(newData);
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.put("/api/v1/finalproject", async (req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

app.delete("/api/v1/finalproject", async (req, res) => {
    try {
        res.json({})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// listen on port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});