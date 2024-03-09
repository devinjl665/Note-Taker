const express = require('express');
const path = require('path');
const api = require('./routes/index.js');



const PORT = process.env.PORT || 3001;


const app = express ();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.use('/api', api);


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index'))
    );


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes'))
    );

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index'))
    );


app.listen(PORT, () => 
console.log(`App is listening at http://localhost:${PORT}`)
);