require('dotenv').config(); // Load .env variables

const express = require('express');
const app = express();

console.log("Hello World");

// ✅ Root-level logger middleware (MUST be first)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next(); // Move to the next middleware/route handler
});

// ✅ Serve Static Files
app.use('/public', express.static(__dirname + '/public'));

// ✅ Root Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// ✅ JSON API Route
app.get('/json', (req, res) => {
    let message = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }

    res.json({ message });
});

// ✅ Current Time to Object
app.get('/now', (req, res, next) => {
    req.time = new Date().toString(); // Add current time to request object
    next(); // Pass control to next function
}, (req, res) => {
    res.json({ time: req.time }); // Respond with JSON
});


module.exports = app;