const Database = require('../db/config').database

const getValuePerHours = (profile) => {
    const hoursPerDays = profile['hours-per-day'];
    const daysPerWeek = profile['days-per-week'];
    const monthlyBudget = profile['monthly-budget'];
    // Dias por semana * horas por dia * 4 semenas de trabalho.
    const valuePerHour = ((monthlyBudget / ((daysPerWeek * hoursPerDays) * 4))).toFixed(2);
    return valuePerHour;
};

const get = async () => {
    const db = await Database();
    //
    const returnData = await db.get('Select * from profile');    
    //
    db.close();
    return {
        name : returnData.name,
        avatar : returnData.avatar,
        "monthly-budget" : returnData.monthlyBudget,        
        "days-per-week" : returnData.daysPerWeek,
        "hours-per-day" : returnData.hoursPerDay,
        "vacation-per-year" : returnData.vacationPerYear,
        "value-hours" : returnData.valueHours
    };
};

const update = async (profile) => {
    const db = await Database();
    //
    const valueHours = getValuePerHours(profile);
    // 
    console.log(profile);
    const sql = `UPDATE profile SET 
        name = "${profile.name}", 
        avatar = "${profile.avatar}", 
        monthlyBudget = ${profile['monthly-budget']}, 
        daysPerWeek = ${profile['days-per-week']},
        hoursPerDay = ${profile['hours-per-day']}, 
        vacationPerYear = ${profile['vacation-per-year']}, 
        valueHours = ${valueHours}`;
    //
    await db.run(sql);
    //
    db.close();    
};

module.exports = {
    get, update
}