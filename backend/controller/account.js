const jwt = require('jsonwebtoken')
const accountModel = require('../model/account')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)


class account {
    login = (req, res, next) => {
        const username = req.body.username
        const password = req.body.password

        accountModel.findOne({
            username: username
        })
            .then(data => {
                if (data == null)
                    return res.json({ status: false })
                else {
                    const hashpass = bcrypt.compare(password, data.password)
                    if (hashpass == false) {
                        return res.json({ status: false })
                    } else {
                        const token = jwt.sign({
                            username: username
                        }, process.env.TOKEN_PASS)
                        return res.json({
                            status: true,
                            token: token
                        })
                    }

                }
            })
            .catch(err => console.log(`error : ${err}`))
    }
    register = (req, res, next) => {
        const username = req.body.username;
        const password = bcrypt.hashSync(`${req.body.password}`, salt)
        const email = req.body.email;
        const phone = req.body.phone;

        accountModel.findOne({
            username: username
        })
            .then((data) => {
                if (data) {
                    res.json("tài khoản đã tồn tại !!!!")
                }
                else {
                    accountModel.create({
                        username: username,
                        password: password,
                        email: email,
                        phone: phone,
                    })
                        .then(data => {
                            if (data) {
                                //console.log(data.password)
                                res.json('Đăng Ký Thành Công !!!')
                            } else
                                res.json('Đăng Ký Thất Bại !!!')
                        })
                        .catch((err) => console.log(`error : ${err}`))
                }
            })
            .catch((err) => console.log(`error : ${err}`))
    };


}



module.exports = new account