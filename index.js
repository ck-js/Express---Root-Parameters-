const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;

// root parameters 

app.get('/', (req,res) => {
    res.send('Hello Express, this is root');
});

app.get('/movies', (req,res) => {
    res.send('Hello Express, this is movies');
});


app.get('/movies/35', (req,res) => {
    res.send('Hello Express, this is movies with the ID of 35 in the movies path');
});

app.get('/movies/:id', (req,res) => {
    res.send('Hello Express, this is root with the ID parameter ');
});

app.get('/movies/:id', (req,res) => {
    res.send('Hello Express, this is movies with the ID ${req.params.id} in the movies directory');
});

app.get('/movies/:id/:name', (req,res) => {
    res.send(
        'Hello Express, this is movies with ID ${req.params.id} with the name ${req.params.name} in the movies directory');
});

app.get('/movies/:id/:name', (req,res) => {
    const {id, name} = req.params;
    res.send(
        'Hello Express, this is movies with ID ${id} with the name ${name} in the movies directory');
});


// Middleware in Express

app.use(express.json());

app.get('/', (req, res) => {
    console.log('The request body is converted from JSON to JS object')
    console.log(
        'We can get the name from the request body:',
     req.body.name)
})

// create authentication middleware
function authenticate(req, res) {
    if (req.body.role === 'Admin') {
        console.log('Authenticated');
    } else {
        console.log('Unauthorized');
    }
}
app.use(authenticate);

// third party middleware 
app.use(morgan('tiny'));

app.get('/', (req,res) => {
  res.status(500).send('Request Received');
})

app.use((req,res) => {
    console.log('Incoming request');
    console.log('Request hostname: ', req.hostname);
    console.log('Request path: ', req.path)
});


app.listen(port, () => {
    console.log(`Guess whose back on port ${port}`);
})