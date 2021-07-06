const mongoose = require('mongoose');

const PBSchema = mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true

    },

    phone_number: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('TrialPB' , PBSchema);