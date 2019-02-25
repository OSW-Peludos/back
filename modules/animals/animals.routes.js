const AnimalsRouting = require('express').Router();
const Animals = require('./animals.controller');
const STATUS = require('http-status')
const { errorSender } = require('../utils/index');

AnimalsRouting.get('/', async (req, res)=>{
  try {
    const animalsInfo = await Animals.findAll(req);
    res.statusCode = STATUS.OK;
    res.send({...animalsInfo})
  } catch (error) {
    errorSender(res, error)
    
  }
})

AnimalsRouting.get('/:id', async (req, res)=>{
  try {
    const animalsInfo = await Animals.findOne(req);
    res.statusCode = STATUS.OK;
    res.send({...animalsInfo})
  } catch (error) {
    errorSender(res, error)
  }
})

AnimalsRouting.post('/', async (req, res)=>{
  try {
    const animalsInfo = await Animals.save(req);
    res.statusCode = STATUS.OK;
    res.send({...animalsInfo})
  } catch (error) {
    errorSender(res, error)
  }
})


AnimalsRouting.patch('/:id', async (req, res)=>{
  try {
    const animalsInfo = await Animals.update(req);
    res.statusCode = STATUS.OK;
    res.send({...animalsInfo})
  } catch (error) {
    errorSender(res, error)
  }
})


module.exports = AnimalsRouting