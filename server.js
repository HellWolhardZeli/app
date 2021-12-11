const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // For legacy browser support
};
var data = null;
app.use(cors(corsOptions));
app.get('/', (req, res) => {
	res.send('helo from server');
});
app.get('/data', (req, res) => {
	data = fs.readFileSync('./data/task.json');
	data = JSON.parse(data);
	console.log('sent');
	res.send(data);
});
app.listen(5000);
