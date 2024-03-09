const express = require('express');
const apiRoute = require('./routes/apiRoute.js');
const htmlRoute = require('./routes/htmlRoute.js');



const PORT = process.env.PORT || 3001;


const app = express ();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.use('/api', apiRoute);
app.use('/', htmlRoute)



app.listen(PORT, () => 
console.log(`App is listening at http://localhost:${PORT}`)
);