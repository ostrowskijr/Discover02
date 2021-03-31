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

const saveJob = (req) => {    
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
};

const deleteJob = (id) => {    
    var position = jobs.indexOf(jobs.find(job => job.id == id));     
    jobs.slice(position, 1);    
};

const getJobs = () => {
    return jobs;
};

module.exports = {
    saveJob, getJobs, deleteJob
}