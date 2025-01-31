require('dotenv').config(); // Load .env variables

let express = require('express');
let app = express();

console.log("Hello World");

app.get('/', function (req, res) {
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get('/json', function (req, res) {
    let message = "Hello json"

    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }

    res.json({ message });
});

// Serve static files
app.use('/public', express.static(__dirname + '/public'));

module.exports = app;
