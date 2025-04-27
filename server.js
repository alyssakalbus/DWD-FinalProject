const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Add middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/careers', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/careers.html'));
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});