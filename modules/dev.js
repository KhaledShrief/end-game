const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devSchema = new Schema({
    content: String,
    image: String,
});

module.exports = mongoose.model('Dev', devSchema);