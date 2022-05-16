const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    name: {
        type: String,
        min: 4,
    },
    mail: {
        type: String,
        min: 4,
    },
    phone: {
        type: String,
        min: 4,
    },
    pass: {
        type: String,
        min: 4,
    }
}, {
    collation: { locale: 'en_US', strength: 1 }
});

const accountModel = mongoose.model('account', accountSchema)
module.exports = accountModel;