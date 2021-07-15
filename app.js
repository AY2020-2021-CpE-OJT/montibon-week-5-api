const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');
let port = process.env.PORT || 3000;


const phoneBookRoutes = require('./routes/phonebook');


app.use(express.json());
app.use('/phonebook' , phoneBookRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Phonebook");
});


mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true,
         useUnifiedTopology: true }, () =>
         console.log('DB is online')
);


app.listen(port, () => {
    console.log('Connected to Port');
});

// Tutorial 1, JWT Securing

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Gerald',
        email: 'gerald@gmail.com'
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        });
    });
});

app.get("/api", (req, res) => {
    res.send("Welcome to API");
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if (err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
        });
        }
    });
});


// Token Format
// Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000);