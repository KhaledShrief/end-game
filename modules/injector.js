const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const injectorSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    image: String,

});
module.exports = mongoose.model('Injector', injectorSchema);