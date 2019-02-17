const AnimalsRouting = require('express').Router();
const Animals = require('./animals.controller');
const STATUS = require('http-status');

/**
 * 
 */
AnimalsRouting.get('/', async (req, res)=>{
  try {
    const animalsInfo = await Animals.findAll(req);
    res.statusCode = STATUS.OK;
    res.send({...animalsInfo})
  } catch (error) {
    console.log(error)
    res.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    res.send(error)
  }
})


module.exports = AnimalsRouting