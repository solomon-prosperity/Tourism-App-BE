const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    name: {
        type: String , 
        required: true 

    } ,
    star: {
        type: Number , 
        required: true 

    } ,
    avatar: {
        type: String  
    } ,
    review: {
        type: String , 
        required: true 

    } ,
    reviews: {
        type: String 

    } ,
    date: {
        type: Date , 
        default: Date.now
    }
})

let review = mongoose.model('Review' , reviewSchema)
module.exports = review