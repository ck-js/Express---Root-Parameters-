const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');

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
        console.log('Unauthorized User');
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

// middleware router
router.use((req, res, next) => {
    console.log('Request to this router received');
})

app.use((req, res) => {
    console.log('Incoming Request...');
    console.log('Request type' + req.method);
    console.log('The flow stops here...');
})
// below function won't run because we already use 'use'
app.get((req,res) => {
    console.log('We did not make it to the middleware')
})

// use next to move onto next middleware
app.use((req,res,next) => {
    console.log('Incoming request...');
    console.log('Request host', req.hostname);
    console.log('Request path', req.path);
    next();
})
// below will run because we use next function above
app.get('/users/:id', function(req,res,next) {
    console.log('User Sent Success')
})

app.use(express.json());
app.get('/', (req, res) =>{
    console.log('Request body username',
    req.body.username)
})

function checkReqBody(req, res) {
    if (req.body !== undefined) {
        console.log('Valid Request Body')
    } else {
        console.log('Invalid request body')
    }
}
app.use(checkReqBody)

// Express Router 
app.use('/users', usersRouter);
app.use('/posts', postsRouter)

usersRouter.use('/:usersId/', (req, res, next) => {
    console.log(
        `Router use for /user with method${req.method} and path ${req.path}`
    );
    next();
});

app.use('/', router);
router.param('User ID', (req,res,next,userId) => {
    if (userId === '1') {
        console.log(
            `This is an alert for ${userId}`)
    }
    next();
});
router.get('/user/:userId', (req,res) => {
    res.send('Router get')
})



app.listen(port, () => {
    console.log(`Guess whose back on port ${port}`);
})