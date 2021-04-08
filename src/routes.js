const express = require('express');
const DashbourdController = require('./controllers/DashbourdController')
const jobController = require('./controllers/JobController')
const profileController = require('./controllers/ProfileController');
const router = express.Router();

//
// Rota Index.html (Render - Renderizar arquivo Ejs.)
router.get('/', DashbourdController.index);
// Rotas Jobs
router.get('/job', jobController.index);
router.get('/job/:id', jobController.show);
router.post('/job', jobController.save);
router.post('/job/:id', jobController.update);
router.post('/job/delete/:id', jobController.remove)
//router.get('/job-edit', jobController.jobEdit);
// Rotas Profile
router.get('/profile', profileController.index);
router.post('/profile', profileController.update);

module.exports = router;