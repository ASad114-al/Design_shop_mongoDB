require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');
const prudectItem = require('./models/galleryItem')
const prudectRoutes=require('./routes/prudectRoutes')
mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))

    app.use('/',prudectRoutes)





  app.post('/add-product', (req, res) => {
    console.log(req.body);
    const newGalleryItem = new prudectItem(req.body)
    newGalleryItem.save()
    .then(result => {
        res.redirect('/')
        console.log('prudect ist add');
    })
    .catch(err => console.log(err))
})























