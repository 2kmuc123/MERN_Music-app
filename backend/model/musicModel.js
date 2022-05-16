const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    name: {
        type: String,
        min: 4,
    },
    author: {
        type: String,
        min: 4,
    },
    src: {
        type: String,
        min: 4,
    },
    image: {
        type: String,
        min: 4,
    }
}, {
    collation: { locale: 'en_US', strength: 1 }
});


const musicModel = mongoose.model('music', musicSchema)
module.exports = musicModel;