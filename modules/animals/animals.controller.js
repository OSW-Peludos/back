const AnimalsModel = require('./animals.model');

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

module.exports = {
  findAll,
}