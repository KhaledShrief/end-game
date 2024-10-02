const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainDataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: String,
    advise: {
        type: Array,

    }
});
module.exports = mongoose.model('MainData', mainDataSchema);