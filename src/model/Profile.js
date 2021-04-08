let data = {    
    name : 'Luis A Ostrowski Jr',
    avatar : 'https://github.com/ostrowskijr.png',
    "monthly-budget" : 10500,
    "days-per-week" : 5,
    "hours-per-day" : 6,
    "vacation-per-year" : 4,
    "value-hours" : 75
};

const getValuePerHours = () => {
    const hoursPerDays = data['hours-per-day'];
    const daysPerWeek = data['days-per-week'];
    const monthlyBudget = data['monthly-budget'];
    // Dias por semana * horas por dia * 4 semenas de trabalho.
    const valuePerHour = ((monthlyBudget / ((daysPerWeek * hoursPerDays) * 4))).toFixed(2);
    return valuePerHour;
};

const get = () => {
    return {
        ...data,
        'value-per-hours' : getValuePerHours()
    }
};

const update = (profile) => {
    data = profile;
};

module.exports = {
    get, update
}