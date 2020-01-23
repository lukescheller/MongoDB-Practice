const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const signup = require('../functions/signup')
const signin = require('../functions/signin')

router.post('/sign-up', [
    check('name', 'name required').exists(),
    check('email', 'email required').isEmail(),
    check('password', '+3 character password required').isLength({ min: 3 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        const { name, email, password } = req.body
        signup(name, email, password, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

router.post('/sign-in', [
    check('email', 'valid email required').isEmail(),
    check('password', 'password required').exists()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body
        signin(email, password, res)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

module.exports = router