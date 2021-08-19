const mongoose = require('mongoose')
const Schema = mongoose.Schema
const destinationSchema = Schema({
    name: {
        type: String , 
        required: true ,
        min: 2 

    } ,
    location: {
        type: String , 
        required: true ,
        min: 2 

    } ,
    details: {
        type: String , 
        required: true 

    } ,
    otherInfo: {
        type: String , 
        required: true 

    } ,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review" 

    }] ,
    photos: {
        type: Array

    },
    date: {
        type: Date , 
        default: Date.now
    }
})

let destinations = mongoose.model('Destination' , destinationSchema)
module.exports = destinations