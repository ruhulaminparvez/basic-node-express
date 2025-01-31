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

module.exports = app;