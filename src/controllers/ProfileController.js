const Profile = require('../model/Profile')

const index = async (req, res) => {
    res.render('profile', { profile : await Profile.get() });
};

const update = async (req , res) => {
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
    const profile = await Profile.get();
    //
    await Profile.update({
        ...profile,
        ...data,
        'value-hours' : valueHours.toFixed(2)
    });
    return res.redirect('/profile');
};

module.exports = {
    index, update
}