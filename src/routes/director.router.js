const { getAll, getOne, remove, update, bulkCreateDirectors, create } = require('../controllers/director.controllers');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(create);

routerDirector.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerDirector;