const request = require('supertest');
const app = require('../app')
require('../models')

const URL_ACTOR = '/actors'

const actor = {
    firstName: 'Lucas',
    lastName: 'Primero',
    image:'lorem321',
    nationality:'Portugal',
    birthday: '2000-03-03'
}

let actorId
//POST
test("Post ->'URL_ACTOR', should return 201, res.body to be defined and res.body.firstName = actor.firstName", async () => {
    const res = await request(app)
      .post(URL_ACTOR)
      .send(actor)
  
      actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

  })
  

//GET ALL
test('GETALL -> "URL_ACTOR", should return status 200, toBeDefined, req.body.lenght = 1', async () => {
    const res = await request(app)
    .get(URL_ACTOR)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//GET ONE
test('GETONE -> "URL_ACTOR/:id", should return status 200, toBeDefined, req.body.name', async () => {    
    const res = await request(app)
    .get(`${URL_ACTOR}/${actorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})

test("PUT ->'URL_ACTOR/:id', should return status 200, res.body, toBeDefined and res.body.name = Jose", async () => {
    const res = await request(app)
      .put(`${URL_ACTOR}/${actorId}`)
      .send({firstName:'Jose'})
  

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('Jose')

  })
  test("DELETE ->'URL_ACTOR/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${URL_ACTOR}/${actorId}`)
    
    expect(res.status).toBe(204)

  })