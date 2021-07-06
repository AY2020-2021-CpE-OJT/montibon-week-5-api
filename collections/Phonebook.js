const mongoose = require('mongoose');

const PhonebookSchema = mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    phone_numbers: [
        String
    ]

});

module.exports = mongoose.model('Phonebook' , PhonebookSchema);