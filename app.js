const express = require('express')
const app = express()
const DB_CONNECTION = require('./config/connect')

DB_CONNECTION()

app.use(express.json({ extended: false }))
app.use('/user', require('./routes/sign_actions'))
app.use('/contact', require('./routes/company_actions'))

app.get('/', (req, res) => {
    res.json({ homepage: "welcome" })
})

const port = process.env.port || 3000
app.listen(port, console.log(port))