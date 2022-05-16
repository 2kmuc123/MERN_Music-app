const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//Mongoo
mongoose.connect(process.env.MONGOO)
    .then(() => console.log('connect to DATABASE !!!!'))
    .catch(err => console.log(err))


//ROUTE
const loginregister = require('./router/account')
const music = require('./router/music.js')

app.get('/', (req, res, next) => {
    res.json({ status: true, sever: 'running !!!', key: Math.random() })
});

app.use('/api', loginregister)
app.use('/api/music', music)




app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening on PORT : ${process.env.PORT || 8000}`)
})