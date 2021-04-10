const jobUtils = require('../Utils/JobUtils')
const Profile = require('../model/Profile')
const Database = require('../db/config').database

const get = async () => {
    const db = await Database();
    //    
    const sql = `SELECT * FROM job`;
    const returnData = await db.all(sql);
    const profile = await Profile.get();
    //
    const jobs = returnData.map((job) => {
        const newJob = jobUtils.refactoryJob(job, profile);        
        console.log(newJob);
        return {
            ...newJob   
        }        
    });    
    db.close();    
    return jobs; 
}

const save = async (job) => {
    const db = await Database();
    //
    const sql = `
        insert into job (name, dailyHours, totalHours, createdAt)
        values ("${job.name}", ${job['daily-hours']}, ${job['total-hours']}, ${Date.now()})
    `;
    await db.run(sql);
    //
    db.close();    
}

const update = async (newjob) => {
    const db = await Database();
    const id = newjob.id;
    //
    const sql = 
    `UPDATE job SET 
            name = "${newjob.name}",
            dailyHours = ${newjob['daily-hours']},
            totalHours = ${newjob['total-hours']}
    WHERE id = ${id}`;
    const job = await getById(id);
    if (!job) {
        return false;
    }
    await db.run(sql);
    //
    db.close();
    return true;   
};

const remove = async (id) => {
    const db = await Database();
    //
    const job = await getById(id);
    if (!job) {
        return false;
    }
    //
    await db.run(`DELETE FROM job WHERE id = ${id}`);
    //
    db.close();
    return true;
}

const getById = async (id) => {
    // Busca o job com id passado por parametro.
    const db = await Database();
    //
    const job = await db.get(`SELECT * FROM job WHERE id = ${id}`);
    const profile = await Profile.get();    
    //
    db.close();
    return jobUtils.refactoryJob(job, profile);
};

module.exports = {
    save, get, remove, update, getById
}