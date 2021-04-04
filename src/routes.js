const express = require('express');
const jobs = require('./job.js');
const profile = require('./profile.js');
const path = require('path');
const router = express.Router();


const urlViews = path.join(__dirname, '/views/');
//
// Rota Index.html (Render - Renderizar arquivo Ejs.)
router.get('/', (req, res) => res.render(path.join(urlViews, 'index'), { jobs : jobs.getJobs(), profile : profile.getProfile() }));
// Rotas Jobs
router.get('/job', (req, res) => res.render(path.join(urlViews, 'job')));
router.get('/job/:id', jobs.showjob);
router.post('/job', jobs.saveJob);
router.post('/job/:id', jobs.updateJob);
router.post('/job/delete/:id', jobs.deleteJob)
// Rotas Profile
router.get('/job-edit', (req, res) => res.render(path.join(urlViews, 'job-edit')));
router.get('/profile', (req, res) => res.render(path.join(urlViews, 'profile'), { profile : profile.getProfile() }));
router.post('/profile', profile.updateProfile);

module.exports = router;