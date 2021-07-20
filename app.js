require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;


const phoneBookRoutes = require('./routes/phonebook');
const authRoute = require('./routes/auth');
const posts = require('./routes/posts');


app.use(express.json());
app.use('/phonebook' , phoneBookRoutes);

app.use('/auth' , authRoute);
app.use('/posts' , posts);

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


// Tutorial 2

// const authRoute = require('./routes/auth');
// const postRoute = require('./routes/posts');

// app.use('/api/user' , authRoute);
// app.use('/api/posts' , postRoute);


// app.listen(3000, () => console.log ('Server Up and Running'));