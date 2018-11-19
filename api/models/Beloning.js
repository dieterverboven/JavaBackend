var mongoose = require('mongoose');

var beloningSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    naam: String,
    aantalPunten: Number
})

module.exports = mongoose.model('Beloning', beloningSchema);