const jwt = require('jsonwebtoken')
const config = require('config')

const token_check = (req, res, next) => {
    //make sure x-auth-token exists within header
    const token = req.header('token')
    if (!token) {
        return res.status(401).json({
            msg: 'token key & value required'
        })
    }
    //verify token, make sure it's valid
    try {
        const token_info = jwt.verify(token, config.get('jwt_key'))
        req.token_id = token_info.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'token error' })
    }
}

module.exports = token_check