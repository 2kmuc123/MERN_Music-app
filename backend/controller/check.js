const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')


exports.check = (req, res, next) => {
    const token = req.headers.authorization
    if (!token)
        res.redirect('/login')
    const name = jwt.verify(token, process.env.TOKEN_PASS)['name']
    accountModel.findOne({ name })
        .then(data => {
            if (!data)
                res.redirect('/login')
            next()
        })
        .catch(err => {
            console.log(err)
            res.redirect('/login')
        })
}