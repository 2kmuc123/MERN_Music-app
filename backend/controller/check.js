const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')


exports.check = (req, res, next) => {
    const token = req.headers.authorization
    if (!token)
        res.status(500)
    else {
        const username = jwt.verify(token, process.env.TOKEN_PASS)['username']
        accountModel.findOne({ username })
            .then(data => {
                if (!data)
                    res.status(500)
                next()
            })
            .catch(err => {
                console.log(err)
                res.status(500)
            })

    }

}