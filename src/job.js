const profile = require('./profile');
const path = require('path');
const urlViews = path.join(__dirname, '/views/');

const jobs = {
    data: [
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
        }]
};

const saveJob = (req, res) => {    
    //
    // ? Representa que caso não exista o array não busca o campo ID no array
    var id = jobs.data[jobs.data.length -1]?.id || 0;    
    id++; 
    jobs.data.push({
        id : id,
        name : req.body.name,
        'daily-hours' : req.body['daily-hours'],
        'total-hours' : req.body['total-hours'],
        createdAt : Date.now()
    });
    res.redirect('/');
};

const showjob = (req, res) => {
    const id = req.params.id;
    const job = getJobById(id);
    if (!job) {
        return res.send(`Job Id: ${id} não encontrado!`);
    }
    return res.render(path.join(urlViews, 'job-edit'), { job });
};

const deleteJob = (req, res) => {
    const id = req.params.id;    
    console.log('JobId: ' + id);
    //
    const job = getJobById(id);
    if (!job) {
        return res.send(`Job Id: ${id} não encontrado!`);
    }
    // Filter retora uma novo objeto ignoram o registro da query passada na função.
    jobs.data = getJobs().filter(job => Number(job.id) !== Number(id));
    //
    res.redirect('/');
};

const updateJob = (req, res) => {    
    const id = req.params.id;    
    //
    const job = getJobById(id);
    if (!job) {
        return res.send(`Job Id: ${id} não encontrado!`);
    }
    const updateJob = {
        ...job,
        name : req.body.name,
        'daily-hours' : req.body['daily-hours'],
        'total-hours' : req.body['total-hours']
    }        
    jobs.data[job.index] = updateJob;     
    res.redirect(`/job/${id}`);
};

const getJobs = () => {    
    // function map é semelhante ao forEach, porem no loop podemos inserir novos atributos no array e ele retorno um novo objeto ao fim do ciclo.
    const updateJob = jobs.data.map((job, index) => {
        const remaining = remainingDays(job);
        const status = remaining <= 0 ? 'Done' : 'In Progress';
        const budget = calculateBudgetJob(job, profile);        
        return {
            ...job,
            remaining, 
            budget,
            status,
            index
        };
    });
    return updateJob;
};

const calculateBudgetJob = (job, profile) => {
    return profile.getProfile()['value-per-hours'] * job['total-hours'];
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

const getJobById = (id) => {
    // Busca o job com id passado por parametro.
    const job = getJobs().find(item => Number(item.id) === Number(id));
    return job;
};

module.exports = {
    saveJob, getJobs, deleteJob, updateJob, showjob
}