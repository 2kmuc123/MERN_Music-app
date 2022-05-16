const musicModel = require('../model/musicModel.js')

exports.create = (req, res, next) => {
    const music = req.body
    musicModel.create(music)
        .then(data => {
            if (data)
                res.json('Thêm Bài Hát Thành Công !!!!')
            else
                res.status(500).json('Thất Bại !!!')
        })
        .catch(err => console.log(err))
}

exports.getall = (req, res, next) => {
    musicModel.find()
        .then(data => {
            if (data)
                res.json(data)
            else
                res.status(500).json('Thất Bại !!!')
        })
        .catch(err => console.log(err))
}

exports.getone = (req, res, next) => {
    musicModel.findById(req.params.id)
        .then(data => {
            if (data)
                res.json(data)
            else
                res.status(500).json('Thất Bại !!!')
        })
        .catch(err => console.log(err))
}

exports.update = (req, res, next) => {
    const music = req.body
    musicModel.findByIdAndUpdate(req.params.id, music)
        .then(data => {
            if (data)
                res.json('Cập Nhật Thành Công !!!')
            else
                res.status(500).json('Thất Bại !!!')
        })
        .catch(err => console.log(err))
}

exports.delete = (req, res, next) => {
    musicModel.deleteOne({ _id: req.params.id })
        .then(data => {
            if (data)
                res.json('Xóa bài Hát Thành Công !!!')
            else
                res.status(500).json('Thất Bại !!!')
        })
        .catch(err => console.log(err))

}