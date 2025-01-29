let express = require('express');
let app = express();
console.log("Hello World")

app.get('/', function (req, res) {
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get('/json', function (req, res) {
    console.log({ "message": "Hello json" })
    res.json({ message: "Hello json" });
});

app.use('/public', express.static(__dirname + '/public'));

































module.exports = app;
