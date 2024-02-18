const request = require('supertest')
const app = require('../app')

const URL_GENRE = "/genres"
const genre = {
    name:'action'
}
let genreId

test('POST -> "URL_GENRE", should result status 201, toBeDefined and req.body.name = genre.name ', async () => {
    const res = await request(app)
    .post(URL_GENRE)
    .send(genre)
    genreId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})
test('GETALL -> "URL_GENRE", should result status 200, res.body.length= 1', async() => {
    const res = await request(app)
    .get(URL_GENRE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test('GETONE -> "URL_GENRE/:id", should result status 200, res.body.name = "sci-fi"', async() => {
    const res = await request(app)
    .get(`${URL_GENRE}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})
test('PUT -> "URL_GENRE/:id", should result status 200, to be defined and res.body.name = "sci-fi"', async () => {
    const res = await request(app)
    .put(`${URL_GENRE}/${genreId}`)
    .send({name:"sci-fi"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("sci-fi")
})
test('DELETE -> "URL_GENRE/:id", should result status 204', async () => {
    const res = await request(app)
    .delete(`${URL_GENRE}/${genreId}`)

    expect(res.status).toBe(204)
})