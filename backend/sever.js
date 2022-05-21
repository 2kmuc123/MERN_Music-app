const express = require('express');
const cors = require('cors');
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
const fs = require('fs')
fs.readdirSync('./router/').forEach(file => {
    const path = file.split('.js')[0]
    app.use(`/${path}`, require(`./router/${path}`))
});


app.get('/', (req, res, next) => {
    res.json({ status: true, sever: 'running !!!', key: Math.random() })
});




//listen
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening on PORT : ${process.env.PORT || 8000}`)
})

