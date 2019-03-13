const mockingoose = require('mockingoose').default;
const animalModel = require('../animals.model');
const mockedData = require('./animals.mock').animalData

describe('Model test', () => {
  beforeEach(() => mockingoose.resetAll());

  it('Model should list all animals', async () => {
    mockingoose.AnimalRegistry.toReturn([mockedData])

    const list = await animalModel.findAll({})

    expect(list).not.toBeNull()
    expect(list.length).toBeGreaterThan(0)
  })

  it('Model should list selected animal', async ()=>{
    const id="5c67ff7d59c98e40d3072e06";
    mockingoose.AnimalRegistry.toReturn(mockedData, 'findOne')

    const animal = await animalModel.findOne(id)

    expect(animal).not.toBeUndefined()
  })
  
  it('Model should throw id error', async ()=>{
    const id="fakeId";
    try {
      await animalModel.findOne(id)
    } catch (error) {
      expect(error.message).toContain('Invalid ID')
    }
   
  })
  
  it('Model should throw 404', async ()=>{
    const id="5c67ff7d59c98e40d3072e06";
    try {
      await animalModel.findOne(id)
    } catch (error) {
      expect(error.message).toContain('Not found')
    }
   
  })
  
  it('Model should save animal', async ()=>{
    
    const {_id, ...animal } = mockedData

    try {
      await animalModel.save(animal)
    } catch (error) {
      if(error) fail(error)
    }
   
  })
})