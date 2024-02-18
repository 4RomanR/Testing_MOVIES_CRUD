const request = require('supertest')
const app = require('../app')
require('../models')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
const URL_MOVIES = "/movies"
const movie = {
    name:'Perro Gallego',
    image:'lorem',
    synopsis:'Un perrito de la calle',
    releaseYear:2000
}
let movieId

test('POST -> "URL_MOVIES", should result status 201, toBeDefined and req.body.name = movie.name ', async () => {
    const res = await request(app)
    .post(URL_MOVIES)
    .send(movie)
    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test('GETALL -> "URL_MOVIES", should result status 200, res.body.length= 1', async() => {
    const res = await request(app)
    .get(URL_MOVIES)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test('GETONE -> "URL_MOVIES/:id", should result status 200, res.body.name = movie.name"', async() => {
    const res = await request(app)
    .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test('PUT -> "URL_MOVIES/:id", should result status 200, toBeDefined and res.body.name = "Gatitos de la Calle"', async () => {
    const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send({name:"Gatitos de la Calle"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Gatitos de la Calle")
})
test('POST -> "URL_MOVIES/:id/actors" should return status 200, res.body', async () => {
    const actor = await Actor.create({
        firstName: 'Lucas',
        lastName: 'Primero',
        image:'lorem321',
        nationality:'Portugal',
        birthday: '2000-03-03'
    })
    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    actor.destroy()
})
test('POST -> "URL_MOVIES/:id/directors" should return status 200, res.body', async () => {
    const director = await Director.create({
        firstName:'Luis',
        lastName:'Jaguar',
        nationality:'Argentina',
        image:'lorem',
        birthday:'2020-03-01'
    })
    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    director.destroy()
})
test('POST -> "URL_MOVIES/:id/genres" should return status 200, res.body', async () => {
    const genre = await Genre.create({
        name:'Drama'
    })
    const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    genre.destroy()
})

test('DELETE -> "URL_MOVIES/:id", should result status 204', async () => {
    const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(204)
})