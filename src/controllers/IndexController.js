const Jobs = require('../model/Job')
const Profile = require('../model/Profile')

const index = (req, res) => {
    res.render('index', { jobs : Jobs.get(), profile : Profile.get() })
}

module.exports = {
    index
}