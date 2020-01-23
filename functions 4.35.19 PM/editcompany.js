const CompanyModel = require('../models/CompanyModel')

const editcompany = async (company_id, edit_obj, req, res) => {
    //token and user input has been checked
    //get user from token_id and make sure that the users id matches the tokens id
    try {
        let company = await CompanyModel.findById({ _id: company_id })
        if (!company) {
            return res.status(404).json({ msg: 'entry does not exist' })
        }
        //get user from token_id and make sure that the users id matches the tokens id
        if (company.owner.toString() !== req.token_id.id) {
            return res.status(404).json({ msg: 'you are not authorized to edit this companys information' })
        }

        company = await CompanyModel.findByIdAndUpdate(company_id,
            { $set: edit_obj },
            { new: true })
        res.json(edit_obj)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = editcompany