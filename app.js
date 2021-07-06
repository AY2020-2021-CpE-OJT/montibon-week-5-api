const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');


const phoneBookRoutes = require('./routes/phonebook');
const trialPBRoutes = require('./routes/trialpb');


app.use(express.json());
app.use('/phonebook' , phoneBookRoutes);
app.use('/trialpb' , trialPBRoutes);


mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true,
         useUnifiedTopology: true }, () =>
         console.log('DB is online')
);

app.listen(8000);