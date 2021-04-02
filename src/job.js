const profile = require('./profile');

const jobs = [
    {
        id : 1,
        name : "Pizzaria Guloso",
        'daily-hours' : 2,
        'total-hours' : 60,
        createdAt : Date.now()
    },
    {
        id : 2,
        name : "OneTwo Project",
        'daily-hours' : 3,
        'total-hours' : 47,
        createdAt : Date.now()
    }
];

const saveJob = (req, res) => {    
    //
    // ? Representa que caso não exista o array não busca o campo ID no array
    var id = jobs[jobs.length -1]?.id || 0;    
    id++; 
    jobs.push({
        id : id,
        name : req.body.name,
        'daily-hours' : req.body['daily-hours'],
        'total-hours' : req.body['total-hours'],
        createdAt : Date.now()
    });
    res.redirect('/');
};

const deleteJob = (req, res) => {
    const id = req.params.id;    
    console.log('JobId: ' + id);
    //
    var position = jobs.indexOf(jobs.find(job => job.id == id));     
    jobs.slice(position, 1);    
    //
    res.redirect('/');
};

const updateJob = (job) => {
    const position = jobs.indexOf(jobs.find(item => item.id == job.id));
    if (position){
        jobs[position] = job;
    }    
};

const getJobs = () => {    
    // function map é semelhante ao forEach, porem no loop podemos inserir novos atributos no array e ele retorno um novo objeto ao fim do ciclo.
    const updateJob = jobs.map(job => {
        const remaining = remainingDays(job);
        const status = remaining <= 0 ? 'Done' : 'In Progress';
        const budget = profile.getProfile()['value-per-hours'] * job['total-hours'];
        return {
            ...job,
            remaining, 
            budget,
            status
        };
    });
    return updateJob;
};

const remainingDays = (job) => {
    // Calculo de tempo restante do projeto.
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(0);
    // Data Final do projeto
    const createDate = new Date(job.createdAt);
    const dueDay = createDate.getDate() + Number(remainingDays);
    const dueDate = createDate.setDate(dueDay);
    // Total de dias restantes em Milisegundos
    const timeDiffInMs = dueDate - Date.now();
    // Dia em Milisegundos.
    const dayInMs = 1000 * 60 * 60 * 24;
    // Quantidade de dias restantes
    const daysDiff = (timeDiffInMs / dayInMs).toFixed();
    // Dias restantes para finalizar projeto.
    return daysDiff;
};

module.exports = {
    saveJob, getJobs, deleteJob, updateJob
}