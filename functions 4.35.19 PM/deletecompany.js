const CompanyModel = require('../models/CompanyModel')

const deletecompany = async (company_id, req, res) => {
    //req.token_info.id
    //use company_id to find company in db
    try {
        let Find_Company = await CompanyModel.findById({ _id: company_id })
        //compare token with Find_Company.owner
        //if they don't match throw error
        if (Find_Company.owner.toString() !== req.token_id.id) {
            return res.status(404).json({ 'error': 'you are not authorized to delete this company' })
        }
        //if the id was found and ids on either end match, delete
        await CompanyModel.findByIdAndRemove(company_id)
        res.json({ msg: 'company successfully deleted' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = deletecompany