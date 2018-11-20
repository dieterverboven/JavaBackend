const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Beloning = require('../models/Beloning');

//get all beloningen
router.get('/', (req, res, next)=> {
    Beloning.find()
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

// get beloning by id
router.get('/:beloningId', (req, res, next)=> {
    const id = req.params.beloningId;
    Beloning.findById(id)
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
    const beloning = new Beloning({
        _id: new mongoose.Types.ObjectId(),
        naam: req.body.naam,
        aantalPunten: req.body.aantalPunten
    });
    beloning
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Bezig',
        aangemaakteBeloning: beloning
    })
});

router.delete('/:beloningId', (req, res, next)=> {
    const id = req.params.beloningId;
    Beloning.remove({_id: id})
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
    Beloning.remove({})
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

router.patch('/:beloningId', (req, res, next)=>{
    const id = req.params.beloningId;
    const updateOps = {};

    console.log(req.body);


    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    console.log(updateOps);    

    Beloning.update({_id: id}, { $set: updateOps})
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

module.exports = router;