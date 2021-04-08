const Jobs = require('../model/Job')

const index = (req, res) => { res.render('job') }
//const jobEdit = (req, res) => { res.render('job-edit') }

const save = (req, res) => {    
    //
    // ? Representa que caso não exista o array não busca o campo ID no array
    Jobs.save(req.body)
    res.redirect('/');
};

const show = (req, res) => {
    const id = req.params.id;
    const job = Jobs.getById(id);
    //
    if (!job) return res.send(`Job Id: ${id} não encontrado!`);
    return res.render('job-edit', { job });
};

const remove = (req, res) => {
    const id = req.params.id;
    //
    const ok = Jobs.remove(id);
    if (!ok) return res.send(`Job Id: ${id} não encontrado!`);    
    res.redirect('/');
};

const update = (req, res) => {    
    const id = req.params.id;
    //
    const ok = Jobs.update({
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