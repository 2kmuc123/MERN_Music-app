const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')


exports.check = (req, res, next) => {
    const [bearer, token] = (req.headers.authorization).split(' ')
    if (!token || !bearer)
        res.status(500)
    else {
        jwt.verify(token, process.env.TOKEN_PASS, (err, decode) => {
            if (err) {
                res.status(500)
            }
            if (decode) {
                accountModel.findOne({ username: decode.username })
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

        })

    }

}