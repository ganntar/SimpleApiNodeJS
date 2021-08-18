const express = require('express');
const LivroController = require('./controllers/LivroController');
const LivroFilterController = require('./controllers/LivroFilterController');


const routes = express.Router();

routes.get('/livros', LivroFilterController.index);

routes.get('/livros/:id', LivroController.index);
routes.post('/livros', LivroController.create);
routes.put('/livros/:id', LivroController.update);
routes.delete('/livros/:id', LivroController.delete);

module.exports = routes;