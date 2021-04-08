
const calculateBudgetJob = (job, profile) => {
    return profile['value-per-hours'] * job['total-hours'];
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

module.exports = {
    calculateBudgetJob, remainingDays
}