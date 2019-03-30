const AnimalsModel = require('./animals.model');
const STATUS = require('http-status');

/**
 * Find all posible pets on db
 * @param {Request} req 
 */
async function findAll({query = {}}){
  const queryData = { status, skip, limit, order } = query
  queryData.skip = parseInt(skip)
  queryData.limit = parseInt(limit)

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

    if(!animal){
      return Promise.reject({code: STATUS.NOT_FOUND, message: 'Not found'})
    } 

    return animal
    
  } catch (error) {
    return Promise.reject({code: STATUS.BAD_REQUEST, error: error.message })
  }
}
/**
 * Save animal
 * @param {Request} req 
 */
async function save({body}){
  const {animal, contact, date, coordinates, status } = body
  
  try {
    if(!animal){
      return Promise.reject({code: STATUS.BAD_REQUEST, message: 'Animal required'})
    }
    if(!contact){
      return Promise.reject({code: STATUS.BAD_REQUEST, message: 'Contact required'})
    }
  
    const animalRegistry = {
      date,
      coordinates,
      animal,
      contact,
      status
    }

    const animalCreated = await AnimalsModel.save(animalRegistry);
    return animalCreated
  } catch (error) {
    
    return Promise.reject({error: error.message})
  }
}
/**
 * Update animal
 * @param {Request} req 
 */
function update({body, params}){
  const { id } = params;
  
  try {
    return AnimalsModel.update(id, {...body})

  } catch (error) {
    return Promise.reject({code: STATUS.BAD_REQUEST, error: error.message })
  }
  
}

module.exports = {
  findAll,
  findOne,
  save,
  update,
}