const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tyresSchema = new Schema({
    logo: String,
    header: String,
    content: String,
    image: String,
});

module.exports = mongoose.model('Tyres', tyresSchema);