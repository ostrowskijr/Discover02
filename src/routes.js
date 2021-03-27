const express = require('express');
const path = require('path');
const router = express.Router();

const urlViews = path.join(__dirname, '/views/');

const profile = {
    name : 'Luis A Ostrowski Jr',
    avatar : 'https://avatars.githubusercontent.com/u/24586989?v=4',
    "monthly-budget" : 6500,
    "days-per-week" : 5,
    "hours-per-day" : 6,
    "vacation-per-year" : 4
}
//
// Rota Index.html (Render - Renderizar arquivo Ejs.)
router.get('/', (req, res) => res.render(path.join(urlViews, 'index')));
// Rota Criação de Job 
router.get('/job', (req, res) => res.render(path.join(urlViews, 'job')));
// Rota de Edição de Job 
router.get('/job-edit', (req, res) => res.render(path.join(urlViews, 'job-edit')));
// Rota do Profile 
router.get('/profile', (req, res) => res.render(path.join(urlViews, 'profile'), { profile }));

module.exports = router;