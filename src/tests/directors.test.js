const request = require('supertest')
const app = require('../app')

const URL_DIRECTOR = "/directors"
const director = {
    firstName:'Luis',
    lastName:'Jaguar',
    nationality:'Argentina',
    image:'lorem',
    birthday:'2020-03-01'
}
let directorId

test('POST -> "URL_DIRECTOR", should result status 201, toBeDefined and req.body.name = director.name ', async () => {
    const res = await request(app)
    .post(URL_DIRECTOR)
    .send(director)
    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})
test('GETALL -> "URL_DIRECTOR", should result status 200, res.body.length= 1', async() => {
    const res = await request(app)
    .get(URL_DIRECTOR)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test('GETONE -> "URL_DIRECTOR/:id", should result status 200, res.body.name = director.name"', async() => {
    const res = await request(app)
    .get(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})
test('PUT -> "URL_DIRECTOR/:id", should result status 200, to be defined and res.body.name = "Julios"', async () => {
    const res = await request(app)
    .put(`${URL_DIRECTOR}/${directorId}`)
    .send({firstName:"Julios"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Julios")
})
test('DELETE -> "URL_DIRECTOR/:id", should result status 204', async () => {
    const res = await request(app)
    .delete(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(204)
})