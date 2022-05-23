const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')
const checkError = require('./error')


exports.check = (req, res, next) => {
    const [bearer, token] = (req.headers.authorization).split(' ')
    if (!token || !bearer || bearer !== 'Bearer')
        res.status(500).json(checkError.error(101, 'not found token'))
    else {
        jwt.verify(token, process.env.TOKEN_PASS, (err, decode) => {
            if (err) {
                res.status(500).json(checkError.error(101, 'invalid username/password'))
            }
            if (decode) {
                accountModel.findOne({ username: decode.username })
                    .then(data => {
                        if (!data)
                            res.status(500).json(checkError.error(101, 'invalid username/password'))
                        next()
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(checkError.error(101, `${err}`))
                    })
            }

        })

    }

}