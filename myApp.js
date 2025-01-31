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

// ✅ Extract the route parameter
app.get('/:word/echo', (req, res) => {
    const { word } = req.params; // Extract the route parameter
    res.json({ echo: word }); // Respond with JSON
});

// ✅ Extract first and last from query string
app.get('/name', (req, res) => {
    const { first, last } = req.query; // Extract first and last from query string
    res.json({ name: `${first} ${last}` }); // Combine and respond
});

// ✅ POST /name to accept data from a form
const bodyParser = require('body-parser'); // Import body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.post('/name', (req, res) => {
    const { name, age } = req.body;  // Extract the POST data from the body
    res.json({ name, age });  // Respond with the JSON object containing the name and age
});

module.exports = app;