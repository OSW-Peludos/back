const AnimalsModel = require('./animals.model');
const STATUS = require('http-status');

/**
 * Find all posible pets on db
 * @param {Request} req 
 */
async function findAll({query = {}}){
  const queryData = { status, skip, limit, order } = query

  const animalsList = await AnimalsModel.findAll(queryData)
  return {
    list: animalsList,
    count: animalsList.length
  }
}

/**
 * Find choosen animal by id
 * @param {Request} req 
 */
async function findOne({params}){
  const { id } = params;
  try {
    const animal = await AnimalsModel.findOne(id)
    return animal
    
  } catch (error) {
    return Promise.reject({code: STATUS.BAD_REQUEST, error: error.message })
  }
}

module.exports = {
  findAll,
  findOne,
}