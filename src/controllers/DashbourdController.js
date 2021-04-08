const Jobs = require('../model/Job')
const Profile = require('../model/Profile')

let statusCount = {
    progress : 0,
    done : 0,
    total : 0,
    'job-total-hours': 0
};

const index = (req, res) => {
    // montar dados de calculo de projetos da página inicial.    
    statusCount.total = Jobs.get().length;
    statusCount.done = 0;
    statusCount.progress = 0;
    statusCount['job-total-hours'] = 0;
    Jobs.get().forEach(job => {
        statusCount[job.status] += 1;
        // Condição ternaria abaixo.
        statusCount['job-total-hours'] = job.status === 'progress' ? statusCount['job-total-hours'] += Number(job['daily-hours']) : statusCount['job-total-hours'];        
    });
    // Calcular a Quantidade de horas livres no dia
    // Total de horas disponivel no dia - quantidade de horas em projeto em andamento
    const freeHours = Profile.get()['hours-per-day'] - statusCount['job-total-hours'];
    //
    res.render('index', { jobs : Jobs.get(), profile : Profile.get(), statusCount, freeHours });
}

module.exports = {
    index
}