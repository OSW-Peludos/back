const express = require('express');
const router = express.Router();
const PetRegistry = require('../models/PetRegisty');

//http://localhost:3001/api/list/?status=lost&limit=10&skip=0&order=-1
router.get('/', function (req, res) {
    // we query the status (lost / found /unknown) and the pagination params using req.query
    const status = req.query.status;
    let skip;
    let limit;
    let order;
    let db = req.params.db;
    if (req.query.skip) skip = parseInt(req.query.skip, 10)
    if (req.query.limit) limit = parseInt(req.query.limit)
    if (req.query.roder) order = parseInt(req.query.order);
    console.log("----> seaching pets with: limit " + limit + " skip " + skip + " order " + order);
    // order could be -1 or 1 (ascending or descending), we order using date for the moment.
    PetRegistry.find({ status: status }).sort({ date: order }).limit(limit).skip(skip).exec(function (err, list) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!list) {
            return res.json({ error: "No page Found" })
        } else {
            return res.json(list);
        }
    });
});

module.exports = router;
