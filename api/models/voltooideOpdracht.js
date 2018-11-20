const mongoose = require('mongoose');

const voltooideOpdrachtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    opdrachtId: mongoose.Schema.Types.ObjectId,
    gebruikerId: mongoose.Schema.Types.ObjectId,
    uitleg: String,
    goedgekeurd: Number
})

module.exports = mongoose.model('VoltooideOpdracht', voltooideOpdrachtSchema);