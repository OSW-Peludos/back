const mockingoose = require('mockingoose').default;
const httpMock = require('../../utils/testing.mock');
const animalController = require('../animals.controller')
const animalModel = require('../animals.model')
const AnimalsRouter = require('../animals.routes')

describe('Animals unit testing', () => {
  beforeEach(() => mockingoose.resetAll());

  const mockedData = {
    "_id": "5c67ff7d59c98e40d3072e06",
    "animal": {
      "size": "small",
      "_id": "test_animal_id_lost",
      "animalType": "cat",
      "color": "white"
    },
    "contact": {
      "contactName": "Jack Jackonson",
      "contactEmail": "jjson@jjjjssso.com",
      "contactPhone": 111111111,
      "_id": "invalid_contact_id"
    },
    "coordinates": [
      40.22,
      3.87
    ],
    "date": "2019-02-16T12:15:34.431Z",
    "status": "lost"
  }
  describe('Model test', () => {
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
  })

  describe('Controller test', () => {
    it('Controller should list all animals', async () => {
      mockingoose.AnimalRegistry.toReturn([mockedData])

      const animals = await animalController.findAll({ query: {} })

      expect(animals).not.toBeNull()
      expect(animals.list).not.toBeNull()
      expect(animals.count).toBe(1)
    })

    it('Controller should list selected animal', async ()=>{
      const id="5c67ff7d59c98e40d3072e06";
      mockingoose.AnimalRegistry.toReturn(mockedData, 'findOne')

      const animal = await animalController.findOne({params:{id}})

      expect(animal).not.toBeUndefined()
    })
    
    it('Controller should throw id error', async ()=>{
      const id="fakeId";

      try {
        await animalController.findOne({params:{id}})
      } catch (error) {
        expect(error.error).toContain('Invalid ID')
        expect(error.code).toBe(400)
      }
     
    })

    it('Controller should return 404', async ()=>{
      const id="5c67ff7d59c98e40d3072e06";
      try {
        await animalController.findOne({params:{id}})
      } catch (error) {
        expect(error.message).toContain('Not found')
      }
     
    })
  })

  describe('router test', () => {
    it('router should list all animals', async () => {
      mockingoose.AnimalRegistry.toReturn([mockedData])
      const request = httpMock.createRequest({
        method: 'GET',
        url: '/',
        body: {},
        query: {}
      })
      const response = httpMock.createResponse();
      AnimalsRouter(request, response, (err) => {
        expect(err).toBeFalsy()
      })

      response.on('end', (data) => {
        expect(response.statusCode).toBe(200)
        expect(data.count).toBe(1)
      })
    })

    it('router should list selected animal', async ()=>{
      mockingoose.AnimalRegistry.toReturn(mockedData, 'findOne')
      const request = httpMock.createRequest({
        method: 'GET',
        url: '/5c67ff7d59c98e40d3072e06',
        body: {},
        query: {}
      })
      const response = httpMock.createResponse();

      AnimalsRouter(request, response, (err) => {
        expect(err).toBeFalsy()
      })

      response.on('end', (data) => {
        expect(response.statusCode).toBe(200)
        expect(data).not.toBeUndefined()
      })
    })
    
    it('router should throw id error', async ()=>{
      const request = httpMock.createRequest({
        method: 'GET',
        url: '/fakeID',
        body: {},
        query: {}
      })
      const response = httpMock.createResponse();

      AnimalsRouter(request, response, (err) => {
        expect(err).toBeFalsy()
      })

      response.on('end', (data) => {
        expect(response.statusCode).toBe(400)
        expect(data.error).toContain('Invalid ID')
      })
     
    })
    it('Controller should return 404', async ()=>{
      const request = httpMock.createRequest({
        method: 'GET',
        url: '/5c67ff7d59c98e40d3072e06',
        body: {},
        query: {}
      })
      const response = httpMock.createResponse();

      AnimalsRouter(request, response, (err) => {
        expect(err).toBeFalsy()
      })

      response.on('end', (data) => {
        expect(response.statusCode).toBe(404)
        expect(data).not.toBeUndefined()
      })
     
    })
  })
})