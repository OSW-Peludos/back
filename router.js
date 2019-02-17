const express = require('express');
const animals = require('./modules/animals');

const api = express.Router();
api.use('/animals', animals)

module.exports = api