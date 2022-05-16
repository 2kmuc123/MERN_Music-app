const express = require('express')
const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({ extended: false }));

const musicController = require('../controller/music.js')
//create
route.post('/', musicController.create);
//get all
route.get('/', musicController.getall);
//getone
route.get('/:id', musicController.getone);
//update 
route.put('/:id', musicController.update);
//delete
route.delete('/:id', musicController.delete);


module.exports = route