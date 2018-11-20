const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Gebruiker = require('../models/Gebruiker');

router.get('/', (req, res, next)=> {
    Gebruiker.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', (req, res, next)=> {
    const gebruiker = new Gebruiker({
        _id: new mongoose.Types.ObjectId(),
        naam: req.body.naam,
        niveau: req.body.niveau,
        email: req.body.email,
        passwoord: req.body.passwoord,
        behaaldePunten: req.body.behaaldePunten
    });
    gebruiker
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Bezig',
        aangemaakteGebruiker: gebruiker
    })
});

module.exports = router;