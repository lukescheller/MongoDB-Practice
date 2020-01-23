const SignUpModel = require('../models/SignUpModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const signup = async (name, email, password, res) => {
    try {
        let submit_name = await SignUpModel.findOne({ email: email })
        if (submit_name) {
            return res.status(404).json({ msg: 'user already exists in db' })
        }

        submit_name = await new SignUpModel({
            name: name,
            email: email,
            password: password
        })

        const salt = await bcrypt.genSalt(10)
        submit_name.password = await bcrypt.hash(password, salt)

        await submit_name.save()
        res.json({ msg: 'user successfully added to db' })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = signup