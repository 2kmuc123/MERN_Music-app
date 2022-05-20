const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')


exports.check = (req, res, next) => {
    const token = req.headers.authorization
    if (!token)
        return res.redirect('/login')
    const name = jwt.verify(token, process.env.TOKEN_PASS)['name']
    accountModel.findOne({ name })
        .then(data => {
            if (!data)
                return res.redirect('/login')
            return next()
        })
        .catch(err => {
            console.log(err)
            return res.redirect('/login')
        })
}