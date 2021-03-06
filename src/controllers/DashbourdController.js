const Jobs = require('../model/Job')
const Profile = require('../model/Profile')

let statusCount = {
    progress : 0,
    done : 0,
    total : 0,
    'job-total-hours': 0
};

const index = async (req, res) => {
    const jobs = await Jobs.get();
    const profile = await Profile.get();
    // montar dados de calculo de projetos da página inicial.    
    statusCount.total = jobs.length;
    statusCount.done = 0;
    statusCount.progress = 0;
    statusCount['job-total-hours'] = 0;
    ;;    
    jobs.forEach(job => {
        statusCount[job.status] += 1;
        // Condição ternaria abaixo.
        statusCount['job-total-hours'] = job.status === 'progress' ? statusCount['job-total-hours'] += Number(job['daily-hours']) : statusCount['job-total-hours'];        
    });
    // Calcular a Quantidade de horas livres no dia
    // Total de horas disponivel no dia - quantidade de horas em projeto em andamento    
    const freeHours = profile['hours-per-day'] - statusCount['job-total-hours'];
    //
    res.render('index', { jobs, profile, statusCount, freeHours });
}

module.exports = {
    index
}