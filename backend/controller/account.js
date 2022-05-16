const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')

exports.login = (req, res, next) => {
    const name = req.body.name
    const pass = req.body.pass
    accountModel.findOne({
        name: name,
        pass: pass
    })
        .then(data => {
            if (data == null)
                return res.json({ status: false })
            else {
                const token = jwt.sign({
                    name: name
                }, process.env.TOKEN_PASS)
                return res.json({
                    status: true,
                    token: token
                })
            }
        })
        .catch(err => console.log(`error : ${err}`))
}

exports.register = (req, res, next) => {
    const name = req.body.name;
    const pass = req.body.pass;
    const mail = req.body.mail;
    const phone = req.body.phone;

    accountModel.findOne({
        name: name
    })
        .then((data) => {
            if (data) {
                res.json("tài khoản đã tồn tại !!!!")
            }
            else {
                accountModel.create({
                    name: name,
                    pass: pass,
                    mail: mail,
                    phone: phone,
                })
                    .then(data => {
                        if (data) {
                            res.json('Đăng Ký Thành Công !!!')
                        } else
                            res.json('Đăng Ký Thất Bại !!!')
                    })
                    .catch((err) => console.log(`error : ${err}`))
            }
        })
        .catch((err) => console.log(`error : ${err}`))
};