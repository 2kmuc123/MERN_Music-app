const express = require('express')
const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({ extended: false }));

const check = require('../controller/checkAuth')

const musicController = require('../controller/music.js')
//create
route.post('/', check.check, musicController.create);
//get all
route.get('/', check.check, musicController.getall);
//getone
route.get('/:id', check.check, musicController.getone);
//update 
route.put('/:id', check.check, musicController.update);
//delete
route.delete('/:id', check.check, musicController.delete);


module.exports = route