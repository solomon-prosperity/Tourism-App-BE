const express = require('express')
const router = express.Router();
const upload = require('../middlewares/upload')

const {
    createDestination,
    getDestinations,
    getSingleDestination,
    updateDestination,
    deleteDestination,
    searchDestinations,
    changePhotos
} = require ('../controllers/destinationControl')



router.get('/all' , getDestinations)
router.get('/one/:id' , getSingleDestination)
router.post('/create' , upload.array('photos' , 6), createDestination)
router.put('/changephotos/:id' , upload.array('photos' , 6), changePhotos)
router.put('/update/:id' , updateDestination)
router.delete('/delete/:id' , deleteDestination)
router.get('/search' ,  searchDestinations)


module.exports = router