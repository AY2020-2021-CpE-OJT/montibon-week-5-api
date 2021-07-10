const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
let port = process.env.PORT || 3000;


const phoneBookRoutes = require('./routes/phonebook');


app.use(express.json());
app.use('/phonebook' , phoneBookRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});



mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true,
         useUnifiedTopology: true }, () =>
         console.log('DB is online')
);

app.listen(port, () => {
    console.log('Connected on localhost');
});