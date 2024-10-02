const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    isLoggedIn: Boolean,
});
module.exports = mongoose.model('Auth', authSchema);