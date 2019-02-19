const mockingoose = require('mockingoose').default;
const httpMock = require('../../utils/testing.mock');
const AnimalsRouter = require('../animals.routes');
const mockedData = require('./animals.mock').animalData

describe('router test', () => {
  beforeEach(() => mockingoose.resetAll());

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
  
  it('Router should throw id error', async ()=>{
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
  it('Router should return 404', async ()=>{
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
  it('Router should save', async ()=>{
    const {_id, ...dataToSave} = mockedData;

    const request = httpMock.createRequest({
      method: 'POST',
      url: '/',
      body: dataToSave,
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
})