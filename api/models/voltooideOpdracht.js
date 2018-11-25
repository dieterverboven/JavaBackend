const mongoose = require('mongoose');

const voltooideOpdrachtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    opdrachtId: String,
    gebruikerId: mongoose.Schema.Types.ObjectId,
    uitleg: String,
    goedgekeurd: Number,
})

module.exports = mongoose.model('VoltooideOpdracht', voltooideOpdrachtSchema);