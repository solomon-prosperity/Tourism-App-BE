const Review = require ('../models/reviews')
const Destination = require ('../models/destinations');
const reviewValidation = require ('../validations/reviewVal')




const createReview = async (req , res) => {

    // validating user input using joi
    const {error} = reviewValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const image = req.file == undefined ? 'No Image Uploaded' :
    `http://localhost:5000/avatar/${req.file.filename}`

    const review = new Review({...req.body , avatar: image})
    try {
    const saveReview = await review.save()

    const addReviewToDestination = await Destination.findOneAndUpdate({_id : req.params.id} , {$push: {reviews: saveReview._id}} ,
        {new: true})

    
        res.status(200).json({
            success: true,
            msg: `You have successfully created a review for this product` ,
            data: addReviewToDestination
           })


    } catch (err){
        res.status(500).json(err)
    }
}

const getAllReviews = async (req , res) => {
    try { 
        const {page = 1 , limit = 10 } = req.query;

        const allReviews = await Review.find({}).limit(limit * 1).skip((page - 1) * limit);
        res.status(200).json({
           success: true,
           msg: `All reviews are listed below` ,
           total: allReviews.length , 
           data: allReviews
          })
       } catch (err) {
           res.status(500).json({ success: false , data: err})
       }
}

const updateReview = async (req , res) => {
    try {
        const review = await Review.findOneAndUpdate({_id: req.params.id},
            {...req.body} , 
            {new: true})
            if (!review) return res.status(404).json({ success: false , msg: `review not found`})
            const updatedReview = await review.save()
            res.status(200).json({
                success: true , 
                msg: `review details have been updated successfully` , 
                data: updatedReview
            })
    } catch (err) {
            res.status(500).send(err)
        }

}

const deleteReview = async (req , res ) => {
    try {
        const review =  await Review.findOneAndDelete({_id: req.params.id})
        if (!review) return res.status(404).json({ success: false , msg: `review not found`})

        res.status(200).json({
            success: true , 
            msg: `The review with id ${req.params.id} was successfully deleted` , 
        })
        } catch (error) {
            res.status(500).json({
                success: false , 
                msg: error 
            })
        }
}

const changeAvatar = async (req , res) => {
    
     if (req.file == undefined) return res.status(404).json({ success: false, msg: `image missing` })
     let image = `http://localhost:5000/avatar/${req.file.filename}`
    try {

        const review = await Review.findById(req.params.id)
        if (!review) return `couldn't find a review with this id: ${req.params.id}`
        review.avatar = image
        const updatedImage = await review.save()

        res.status(200).json({
            success: true , 
            msg: `The avatar for the review with id ${req.params.id} was successfully changed` ,
            data: updatedImage.avatar 
        })


    } catch (error) {
        res.status(500).json({
            success: false , 
            msg: error 
        })
    }
}

module.exports = {
    createReview ,
    getAllReviews , 
    updateReview ,
    deleteReview ,
    changeAvatar
}