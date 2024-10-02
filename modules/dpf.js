const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dpfSchema = new Schema({
    title: String,
    header: String,
    content: String,
});
module.exports = mongoose.model('DPF', dpfSchema);