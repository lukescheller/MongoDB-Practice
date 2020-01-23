const express = require('express')
const router = express.Router()
const token_check = require('../middleware/token_check')
const { check, validationResult } = require('express-validator')
const postcompany = require('../functions/postcompany')
const getcompanys = require('../functions/getcompanys')
const deletecompany = require('../functions/deletecompany')
const editcompany = require('../functions/editcompany')

//req.token_id.id

router.get('/allcontacts', token_check, async (req, res) => {
    try {
        getcompanys(req, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

router.post('/addcontact', [
    //check token
    token_check, [
        //check user input
        check('company', 'company name required').exists(),
        check('email', 'corporate email required').isEmail(),
        check('association', 'association required').exists()
    ]
], async (req, res) => {
    //if errors exist in user input program ends
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { company, email, association } = req.body
        postcompany(company, email, association, req, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

router.put('/editcontact', [
    token_check, [
        check('company_id', 'company id required').exists()
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { company_id, company, email, association } = req.body
        let edit_obj = {}
        if (company) edit_obj.company = company
        if (email) edit_obj.email = email
        if (association) edit_obj.association = association

        editcompany(company_id, edit_obj, req, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

router.delete('/deletecontact', [
    token_check, [
        check('company_id', 'company id required').exists()
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { company_id } = req.body
        deletecompany(company_id, req, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

module.exports = router