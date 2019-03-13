const animalController = require('../animals.controller')
const mockingoose = require('mockingoose').default;
const mockedData = require('./animals.mock').animalData

describe('Controller unit test', () => {
  beforeEach(() => mockingoose.resetAll());
  
  it('Controller should list all animals', async () => {
    mockingoose.AnimalRegistry.toReturn([mockedData])

    const animals = await animalController.findAll({ query: {} })

    expect(animals).not.toBeNull()
    expect(animals.list).not.toBeNull()
    expect(animals.count).toBe(1)
  })

  it('Controller should list selected animal', async () => {
    const id = "5c67ff7d59c98e40d3072e06";
    mockingoose.AnimalRegistry.toReturn(mockedData, 'findOne')

    const animal = await animalController.findOne({ params: { id } })

    expect(animal).not.toBeUndefined()
  })

  it('Controller should throw id error', async () => {
    const id = "fakeId";

    try {
      await animalController.findOne({ params: { id } })
    } catch (error) {
      expect(error.error).toContain('Invalid ID')
      expect(error.code).toBe(400)
    }

  })

  it('Controller should return not found', async () => {
    const id = "5c67ff7d59c98e40d3072e06";
    try {
      await animalController.findOne({ params: { id } })
    } catch (error) {
      expect(error.message).toContain('Not found')
    }

  })

  it('Controller should save animal', async () => {
    const { _id, ...rest } = mockedData
    
    try {
      const savedAnimal = await animalController.save({body: rest})
      
      expect(savedAnimal.status).toBe(mockedData.status)
    } catch (error) {
      if(error) fail(error)
    }

  })
  
  it('Controller should require animal on save', async () => {
    const { _id, animal, ...rest } = mockedData
    
    try {
      await animalController.save({body: rest})
      
    } catch (error) {
      expect(error.message).toContain('Animal required')
    }

  })

  it('Controller should require contact on save', async () => {
    const { _id, contact, ...rest } = mockedData
    
    try {
      await animalController.save({body: rest})
      
    } catch (error) {
      expect(error.message).toContain('Contact required')
    }

  })
  
  it('Controller should throw error on save', async () => {
    const { _id, ...rest } = mockedData
    const errorMsg = 'Uncatched error'

    mockingoose.AnimalRegistry.toReturn(new Error(errorMsg), 'create')

    try {
      await animalController.save({body: rest})
      
    } catch (error) {
      expect(error.error).toContain(errorMsg)
    }

  })
  
  it('Controller should update an element', async () => {
    const {_id } = mockedData
    mockingoose.AnimalRegistry.toReturn({...mockedData, status: 'found'}, 'findOneAndUpdate')

    try {
      const updatedAnimal = await animalController.update({body: {status: 'found'}, params: {id: _id}})
      expect(updatedAnimal.status).toContain('found')
    } catch (error) {
      if (error) fail(error)
    }

  })
})