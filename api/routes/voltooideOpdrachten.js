const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const VoltooideOpdracht = require('../models/VoltooideOpdracht');

//get all voltooide opdrachten
router.get('/', (req, res, next)=> {
    VoltooideOpdracht.find()
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

// get by id
router.get('/:opdrachtId', (req, res, next)=> {
    const id = req.params.opdrachtId;
    VoltooideOpdracht.findById(id)
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

// get opdrachten by gebruikerid
router.get('/gebruiker/:gebruikerId', (req, res, next)=> {
    const gebruikerId = req.params.gebruikerId;
    VoltooideOpdracht.find({gebruikerId: gebruikerId})
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

// get opdrachten by gebruiker

// goedkeuren/0 laat alle data zien dat nog niet goedgekeurd is, goedkeuren/1 laat data zien dat al wel is goedgekeurd

router.get('/goedkeuren/:bool', (req, res, next)=> {
    const bool = req.params.bool;
    VoltooideOpdracht.find({goedgekeurd: bool})
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

// voltooide opdracht aanmaken
router.post('/', (req, res, next)=> {
    const opdracht = new VoltooideOpdracht({
        _id: new mongoose.Types.ObjectId,
        gebruikerId: req.body.gebruikerId,
        opdrachtId: req.body.opdrachtId,
        uitleg: req.body.uitleg,
        goedgekeurd: 0        
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

    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    VoltooideOpdracht.update({_id: id}, {$set: updateOps})
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

// update opdracht via patch
router.patch('/goedkeuren/:opdrachtId', (req, res, next)=> {
    const id = req.params.opdrachtId;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    VoltooideOpdracht.update({_id: id}, {$set: updateOps, goedgekeurd: 1})
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
    VoltooideOpdracht.remove({_id: id})
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

// alle voltooide opdrachten verwijderen
router.delete('/', (req, res, next)=> {
    VoltooideOpdracht.remove({})
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
    VoltooideOpdracht.remove({})
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