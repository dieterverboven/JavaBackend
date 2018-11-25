const mongoose = require('mongoose');

const opdrachtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uitleg: String,
    punten: Number,
    goedgekeurd: Number
});

module.exports = mongoose.model('Opdracht', opdrachtSchema);