const express = require('express');
const router = express.Router();
const PetRegistry = require('../models/AnimalRegisty');
const mongoose = require('mongoose');
//http://localhost:3001/api/animal?id=test_registry
router.get('/', function (req, res) {
    // we query the id using req.query
    const id = mongoose.Types.ObjectId(req.query.id);
    
    console.log("----> seaching pet with id " + id);
    // order could be -1 or 1 (ascending or descending), we order using date for the moment.
    
        PetRegistry.findById(id).exec(function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            if (!result) {
                return res.json({ error: "No page Found" })
            } else {
                return res.json(result);
            }
    });


});

module.exports = router;
