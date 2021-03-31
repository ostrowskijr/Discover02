const express = require('express');
const jobs = require('./job.js');
const path = require('path');
const router = express.Router();


const urlViews = path.join(__dirname, '/views/');

const profile = {
    name : 'Luis A Ostrowski Jr',
    avatar : 'https://github.com/ostrowskijr.png',
    "monthly-budget" : 6500,
    "days-per-week" : 5,
    "hours-per-day" : 6,
    "vacation-per-year" : 4
}
//
// Rota Index.html (Render - Renderizar arquivo Ejs.)
router.get('/', (req, res) => res.render(path.join(urlViews, 'index'), { jobs : jobs.getJobs() }));
// Rota Get de Página Job 
router.get('/job', (req, res) => res.render(path.join(urlViews, 'job')));
// Rota Criação Job
router.post('/job', (req, res) => {    
    jobs.saveJob(req);
    res.redirect('/');
});
// Delete job
router.delete('/job', (req, res) => {
    const id = req.body.id;
    console.log(id);
    jobs.deleteJob(id);
    res.send('ok!');
})
// Rota de Edição de Job 
router.get('/job-edit', (req, res) => res.render(path.join(urlViews, 'job-edit')));
// Rota do Profile 
router.get('/profile', (req, res) => res.render(path.join(urlViews, 'profile'), { profile }));

module.exports = router;