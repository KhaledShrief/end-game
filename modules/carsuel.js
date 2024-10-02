const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carsuelSchema = new Schema({
    image: String,
});
module.exports = mongoose.model('Carsuel', carsuelSchema);