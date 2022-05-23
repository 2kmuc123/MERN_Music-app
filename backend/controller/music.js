const musicModel = require('../model/musicModel.js')
const musicError = require('./error')

class music {
    create = (req, res, next) => {
        const music = req.body
        musicModel.create(music)
            .then(data => {
                if (data)
                    res.json('Thêm Bài Hát Thành Công !!!!')
                else
                    res.status(500).json(musicError.error(101, 'Thêm bài Hát Thất bại !!!'))
            })
            .catch(err => console.log(err))
    }
    getall = (req, res, next) => {
        musicModel.find()
            .then(data => {
                if (data)
                    res.json(data)
                else
                    res.status(500).json(musicError.error(101, 'Thất bại !!!'))
            })
            .catch(err => console.log(err))
    }

    getone = (req, res, next) => {
        musicModel.findById(req.params.id)
            .then(data => {
                if (data)
                    res.json(data)
                else
                    res.status(500).json(musicError.error(101, 'Thất bại !!!'))
            })
            .catch(err => console.log(err))
    }
    update = (req, res, next) => {
        const music = req.body
        musicModel.findByIdAndUpdate(req.params.id, music)
            .then(data => {
                if (data)
                    res.json('Cập Nhật Thành Công !!!')
                else
                    res.status(500).json(musicError.error(101, 'Thất bại !!!'))
            })
            .catch(err => console.log(err))
    }

    delete = (req, res, next) => {
        musicModel.deleteOne({ _id: req.params.id })
            .then(data => {
                if (data)
                    res.json('Xóa bài Hát Thành Công !!!')
                else
                    res.status(500).json(musicError.error(101, 'Thất bại !!!'))
            })
            .catch(err => console.log(err))

    }
}

module.exports = new music





