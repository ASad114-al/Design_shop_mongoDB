const { Router } = require('express')
const express=require('express')
const router=express.Router()
const prudectItem = require('../models/galleryItem')





router.get('/', (req, res) => {
   
    prudectItem.find()
    .then(result => {
       
        res.render('index', {prudectData: result})

    })
    .catch(err => console.log(err) )
})

router.get('/add', (req, res) => {
    prudectItem.aggregate([{ $sample: { size: 6 } }])
    .then(result => {
      
        res.render('add', {prudectData: result})

    })
})


router.post('/add-product', (req, res) => {
    console.log(req.body);
    const newGalleryItem = new prudectItem(req.body)
    newGalleryItem.save()
    .then(result => {
        res.redirect('/')
        console.log('prudect ist add');
    })
    .catch(err => console.log(err))
})

router.get('/single/:pictureId', (req, res) => {
    console.log(req.params.pictureId);
    prudectItem.findById(req.params.pictureId)
    .then(result => {
        res.render('details',{picture:result})
    })
    .catch(err => console.log(err))
    })

  router.get('/single/:pictureId/delete', (req, res) => {
    prudectItem.findByIdAndDelete(req.params.pictureId)
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
    })
   router.post('/single/:pictureId/edit', (req, res) => {
        console.log(req.body)
        prudectItem.findByIdAndUpdate(req.params.pictureId, req.body)
        .then(result => res.redirect(`/single/${req.params.pictureId}`))
        .catch(err => console.log(err))
    })
    router.get('/Lessthan', (req, res) => {
        
        prudectItem.aggregate([{ $match: { Price: { $lte: 30 } } }])
            .then((result) => {
                res.render('Lessthan', {prudectData: result});
            })
            .catch((err) => console.log(err));
    });
    
    router.get('/WeeklyRec', (req, res) => {
        prudectItem.aggregate([{ $sample: { size: 6 } }])
            .then((result) => {
                res.render('WeeklyRec', { prudectData: result });
            })
            .catch((err) => console.log(err));
    });

  

module.exports=router