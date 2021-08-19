const express = require('express')
const router = express.Router();
const upload = require('../middlewares/avatar')

const {
    createReview ,
    getAllReviews , 
    updateReview ,
    deleteReview,
    changeAvatar
} = require ('../controllers/reviewsControllers')



router.get('/all' , getAllReviews)
router.post('/create/:id' , upload.single('avatar'), createReview)
router.put('/changeavatar/:id' , upload.single('avatar'), changeAvatar)
router.put('/update/:id' , updateReview)
router.delete('/delete/:id' , deleteReview)


module.exports = router