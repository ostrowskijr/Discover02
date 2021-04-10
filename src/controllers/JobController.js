const Jobs = require('../model/Job')

const index = (req, res) => { res.render('job') }
//const jobEdit = (req, res) => { res.render('job-edit') }

const save = async (req, res) => {    
    //
    // ? Representa que caso não exista o array não busca o campo ID no array
    await Jobs.save(req.body)
    res.redirect('/');
};

const show = async (req, res) => {
    const id = req.params.id;
    const job = await Jobs.getById(id);
    console.log(job);
    //
    if (!job) return res.send(`Job Id: ${id} não encontrado!`);
    return res.render('job-edit', { job });
};

const remove = async (req, res) => {
    const id = req.params.id;
    //
    const ok = await Jobs.remove(id);
    if (!ok) return res.send(`Job Id: ${id} não encontrado!`);    
    res.redirect('/');
};

const update = async (req, res) => {    
    const id = req.params.id;
    //
    const ok = await Jobs.update({
        id,
        ...req.body        
    });
    if (!ok) {
        return res.send(`Job Id: ${id} não encontrado!`);
    }    
    res.redirect(`/job/${id}`);
};

module.exports = {
    save, show, update, remove, index
}