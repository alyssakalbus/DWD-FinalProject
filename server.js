const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const config = require('./config.js');

const mongoose = require('mongoose');
const users = require('./models/users');

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

const port = config.PORT || 3000;

// Handle data
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// server
app.use(express.static(publicURL));



// User Endpoints //

// Create User
app.post("/api/v1/users", async (req, res) => {
    try {
        const newData = {

            name: req.body.name,
            email: req.body.email,
            birthday: req.body.birthday
        }
        const data = await users.create(newData);
        res.json({data})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// Get Users
app.get("/api/v1/users", async (req, res) => {
    try {
        const data = await users.find();
        res.json({data})
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// Create New Encoding
app.put("/api/v1/users/:id", async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            birthday: req.body.birthday
        };

        const data = await users.findOneAndUpdate(
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


app.delete("/api/v1/users/:id", async (req, res) => {
    try {
        const deletedDocument = await users.findOneAndDelete({ _id: req.params.id });
        res.json({
            message: "Successfully removed item",
            data: deletedDocument
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

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

// listen on port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});