const jobUtils = require('../Utils/JobUtils')
const profile = require('../model/Profile')

let data = [
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

const get = () => {
    // function map é semelhante ao forEach, porem no loop podemos inserir novos atributos no array e ele retorno um novo objeto ao fim do ciclo.
    const jobs = data.map((job, index) => {
        const remaining = jobUtils.remainingDays(job);        
        const status = remaining <= 0 ? 'done' : 'progress';
        const budget = jobUtils.calculateBudgetJob(job, profile.get());                
        return {
            ...job,
            remaining, 
            budget,
            status,
            index
        };
    });    
    return jobs; 
}

const save = (job) => {
    var id = get()[get().length -1]?.id || 0;   
    id++;
    //
    data.push({
        id : id,
        name : job.name,
        'daily-hours' : job['daily-hours'],
        'total-hours' : job['total-hours'],
        createdAt : Date.now()
    });
}

const update = (newjob) => {
    const id = newjob.id;
    const job = getById(id);
    if (!job) {
        return false;
    }
    data = get().map(job => {
        if (Number(job.id) === Number(id)) {            
            job = {
                ...job,
                ...newjob
            }
        }
        return job;
    });
    return true;   
}

const remove = (id) => {
    //    
    if (!getById(id)) {
        return false;
    }
    // Filter retora uma novo objeto ignoram o registro da query passada na função.
    data = get().filter(job => Number(job.id) !== Number(id));
    return true;
}

const getById = (id) => {
    // Busca o job com id passado por parametro.        
    return get().find(item => Number(item.id) === Number(id));
};

module.exports = {
    save, get, remove, update, getById
}