const calculateBudgetJob = (job, profile) => {
    return Number(profile["value-hours"]) * Number(job["total-hours"]);
};

const remainingDays = (job) => {
    // Calculo de tempo restante do projeto.
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    // Data Final do projeto
    const createDate = new Date(job.createdAt);
    const dueDay = createDate.getDate() + Number(remainingDays);
    const dueDate = createDate.setDate(dueDay);
    // Total de dias restantes em Milisegundos
    const timeDiffInMs = dueDate - Date.now();
    // Dia em Milisegundos.
    const dayInMs = 1000 * 60 * 60 * 24;
    // Quantidade de dias restantes
    //const daysDiff = (timeDiffInMs / dayInMs).toFixed();
    const daysDiff = Math.floor(timeDiffInMs / dayInMs);
    // Dias restantes para finalizar projeto.
    return daysDiff;
};

const refactoryJob = (job, profile) => {    
    //                        
    const newJob = {
        'id' : job.id,
        name : job.name,
        'daily-hours' : job.dailyHours,
        'total-hours' : job.totalHours,
        createdAt : job.createdAt            
    };
    const remaining = remainingDays(newJob);  
    const status = remaining <= 0 ? 'done' : 'progress';
    const budget = calculateBudgetJob(newJob, profile);
    //
    newJob.remaining = remaining;
    newJob.status = status;
    newJob.budget = budget;        
    return newJob;    
};

module.exports = {
    calculateBudgetJob, remainingDays, refactoryJob
}