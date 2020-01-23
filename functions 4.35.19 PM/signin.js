const SignUpModel = require('../models/SignUpModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const signin = async (email, password, res) => {
    try {
        //make sure email exists in db
        let signin = await SignUpModel.findOne({ email: email })
        if (!signin) {
            return res.status(404).json({ msg: 'invalid: email and/or password' })
        }
        //compare user password to hashed password
        const dehashed = await bcrypt.compare(password, signin.password)
        if (!dehashed) {
            return res.status(400).json({ msg: 'invalid: email and/or password' })
        }
        //generate token
        const payload = {
            user: {
                id: signin.id
            }
        }

        jwt.sign(payload, config.get('jwt_key'), {
            expiresIn: 36000
        }, (error, token) => {
            if (error) throw error
            res.json({
                name: signin.name,
                token: token
            })
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = signin