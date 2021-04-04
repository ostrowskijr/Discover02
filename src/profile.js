const profile = {
    name : 'Luis A Ostrowski Jr',
    avatar : 'https://github.com/ostrowskijr.png',
    "monthly-budget" : 10500,
    "days-per-week" : 5,
    "hours-per-day" : 6,
    "vacation-per-year" : 4,
    "value-hours" : 75
}

const getValuePerHours = () => {
    const hoursPerDays = profile['hours-per-day'];
    const daysPerWeek = profile['days-per-week'];
    const monthlyBudget = profile['monthly-budget'];
    // Dias por semana * horas por dia * 4 semenas de trabalho.
    const valuePerHour = ((monthlyBudget / ((daysPerWeek * hoursPerDays) * 4))).toFixed(2);
    return valuePerHour;
};

const updateProfile = (req , res) => {
    // Dados da requisição
    const data = req.body;
    // Semanas no ano
    const weeksPerYear = 52;
    // Semanas disponiveis para trabalhar no ano, subtraindo as férias.
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
    // Total de horas disponiveis por semana
    const weekTotalHours = data['days-per-week'] * data['hours-per-day'];
    // Total de horas trabalhadas no mês
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;
    // Valor por hora trabalhanda
    const valueHours = data['monthly-budget'] /monthlyTotalHours;
    //
    profile.name = data.name;
    profile.avatar = data.avatar;
    profile['monthly-budget'] = data['monthly-budget'];
    profile['days-per-week'] = data['days-per-week'];
    profile['hours-per-day'] = data['hours-per-day'];
    profile['vacation-per-year'] = data['vacation-per-year'];
    profile['value-hours'] = valueHours.toFixed(2);    
    return res.redirect('/profile');
};

const getProfile = () => {
    return {
        ...profile,
        'value-per-hours' : getValuePerHours()
    }
};

module.exports = {
    getProfile, 
    getValuePerHours,
    updateProfile
}