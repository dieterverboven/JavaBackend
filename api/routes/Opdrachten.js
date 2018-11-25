const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Opdracht = require('../models/Opdracht');

//get all opdrachten
router.get('/', (req, res, next)=> {
    Opdracht.find()
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

// get opdracht by id
router.get('/:opdrachtId', (req, res, next)=> {
    const id = req.params.opdrachtId;
    Opdracht.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        console.log('hehe');
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// get opdrachten by punten
router.get('/punten/:aantal', (req, res, next)=> {
    const aantal = req.params.aantal;
    Opdracht.find({punten: aantal})
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

//nieuwe opdracht aanmaken
router.post('/', (req, res, next)=> {
    const opdracht = new Opdracht({
        _id: new mongoose.Types.ObjectId,
        uitleg: req.body.uitleg,
        punten: req.body.punten,
        goedgekeurd: req.body.goedgekeurd
    });
    opdracht
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Aangemaakt',
        aangemaakteOpdracht: opdracht
    })
});

// update opdracht via patch
router.patch('/:opdrachtId', (req, res, next)=> {
    const id = req.params.opdrachtId;
    const updateOps = {};

    console.log(req.body);

    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    Opdracht.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// opdracht verwijderen
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

// alle opdrachten verwijderen
router.delete('/', (req, res, next)=> {
    Opdracht.remove({})
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