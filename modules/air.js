const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AirSchema = new Schema({
    title: String,
    content: String,
    questionOne: String,
    answerOne: String,
    questionTwo: String,
    answerTwo: String,
    questionThree: String,
    answerThree: String,
    image: String,
});

module.exports = mongoose.model('Air', AirSchema);