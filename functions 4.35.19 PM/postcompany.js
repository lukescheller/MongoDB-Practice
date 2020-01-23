const CompanyModel = require('../models/CompanyModel')

const postcompany = async (company, email, association, req, res) => {
    //add a company to the company model
    //make sure each company is associated with whoever's posting it
    try {
        const Company = await new CompanyModel({
            owner: req.token_id.id,
            company: company,
            email: email,
            association: association
        })
        const Company_Saved = await Company.save()
        res.json({
            msg: 'company entry successful',
            company: Company_Saved
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = postcompany