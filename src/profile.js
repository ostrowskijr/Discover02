const profile = {
    name : 'Luis A Ostrowski Jr',
    avatar : 'https://github.com/ostrowskijr.png',
    "monthly-budget" : 10500,
    "days-per-week" : 5,
    "hours-per-day" : 6,
    "vacation-per-year" : 4
}

const getValuePerHours = () => {
    const hoursPerDays = profile['hours-per-day'];
    const daysPerWeek = profile['days-per-week'];
    const monthlyBudget = profile['monthly-budget'];
    // Dias por semana * horas por dia * 4 semenas de trabalho.
    const valuePerHour = ((monthlyBudget / ((daysPerWeek * hoursPerDays) * 4))).toFixed(2);
    return valuePerHour;
};

const getProfile = () => {
    return {
        ...profile,
        'value-per-hours' : getValuePerHours()
    }
};

module.exports = {
    getProfile, 
    getValuePerHours
}