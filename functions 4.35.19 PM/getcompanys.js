const CompanyModel = require('../models/CompanyModel')

const getcompanys = async (req, res) => {
    //the token is there, now find the users
    try {
        const Companys = await CompanyModel.find({ owner: req.token_id.id })
        res.json({
            owner_id: req.token_id.id,
            companys: Companys
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = getcompanys