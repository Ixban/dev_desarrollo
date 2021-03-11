const mongoose = require('mongoose');
const { Schema } = mongoose;

//Modelo Del Objeto
const model = new Schema({

    id: String,
    text: String,
    source: String,
    source_url: String

});

module.exports = mongoose.model('model', model);
