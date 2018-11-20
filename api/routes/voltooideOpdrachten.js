const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const voltooideOpdracht = require('../models/voltooideOpdracht');

//get all voltooide opdrachten
router.get('/', (req, res, next)=> {
    voltooideOpdracht.find()
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

// voltooide opdracht verwijderen
router.delete('/:opdrachtId', (req, res, next)=> {
    const id = req.params.opdrachtId;
    Opdracht.remove({_id: id})
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


module.exports = router;