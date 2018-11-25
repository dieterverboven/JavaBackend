const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Gebruiker = require('../models/Gebruiker');
var passport = require('passport');
require('../../passport-config');

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


// get gebruiker by id
router.get('/:gebruikerId', (req, res, next)=> {
    const id = req.params.gebruikerId;
    Gebruiker.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
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
        message: 'Gebruiker aangemaakt',
        aangemaakteGebruiker: gebruiker
    })
});

router.delete('/:gebruikerId', (req, res, next)=> {
    const id = req.params.gebruikerId;
    Gebruiker.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/', (req, res, next)=> {
    Gebruiker.remove({})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.patch('/:gebruikerId', (req, res, next)=>{
    const id = req.params.gebruikerId;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }

    Gebruiker.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



router.post('/login', (req, res, next)=> {
    console.log(req.body);
    Gebruiker.findOne({naam: req.body.naam, passwoord: req.body.passwoord})
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




module.exports = router;