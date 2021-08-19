const Destination = require ('../models/destinations');
const destinationValidation = require('../validations/validation')

const createDestination = async (req , res) => {

// validating user input using joi
    const {error} = destinationValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    

// saving new destination to database and returning the saved destination details
    
    try {

        let destination = new Destination({...req.body})
        let path = ''
        
        if (req.files) {
            
            req.files.forEach (function (files , index , arr) {
                path = path + 'http://localhost:5000/photos/' + files.filename + ','
            })
            path = path.substring(0 , path.lastIndexOf(","))
            destination.photos = path.split(",")
        } 
        
          const savedDestination = await destination.save();
           res.status(200).json({
               success: true,
               msg: `Destination was successfully created` ,
               data: savedDestination
              })
              

    } catch (err) {
        
    res.status(500).send(err)
          
    }
}


const getDestinations = async (req , res) => {
    try { 
     const {page = 1 , limit = 10 } = req.query; 
     
     const allDestinations = await Destination.find().limit(limit * 1).skip((page - 1) * limit)
     .populate({path: "reviews" , select: ['name' , 'star' , 'avatar' , 'review']});

     res.status(200).json({
        success: true,
        msg: `Your Destinations are listed below` ,
        total: allDestinations.length ,
        data: allDestinations
       })
    } catch (err) {
        res.status(500).json({ success: false , data: err})
    }
}

const getSingleDestination = async (req ,res) => {
    try {
         const singleDestination = await Destination.findOne({ _id : req.params.id}).populate({path: "reviews" , select: ['name' , 'star' , 'avatar' , 'review']});
        if (singleDestination) { 
         res.status(200).json({
            success: true,
            data: singleDestination
           })
        } else {
            res.status(404).json({
                success: false ,
                msg: `Destination not found`
            })
        }
    } catch (err) {
        res.status(500).json({ success: false , data: err})
    }
}

const updateDestination = async (req , res) => {
    
    try {
        const destination = await Destination.findOneAndUpdate({_id: req.params.id},
            {...req.body} , 
            {new: true})

            const updatedDestination = await destination.save()
            res.status(200).json({
                success: true , 
                msg: `your destination details have been updated successfully` ,
                data: updatedDestination
            })
    } catch (err) {
            res.status(500).send(err)
        }

}


const deleteDestination = async (req , res) => {
    try {
    const destination =  await Destination.findOneAndDelete({_id: req.params.id})
    if (!destination) return res.status(404).json({ success: false , msg: `destination not found`})
    res.status(200).json({
        success: true , 
        msg: `The destination with id ${req.params.id} was successfully deleted` , 
    })
    } catch (error) {
        res.status(500).json({
            success: false , 
            msg: error , 
        })
    }
}

const searchDestinations = async (req , res) => {
    try {
        if (req.query.name) {
        let search = await Destination.find({name: {$regex: new RegExp('^'+req.query.name+'.*', 'i')}}).exec()
        search = search.slice(0, 10);
        if (search.length < 1) return res.status(404).json({ success: false , msg: `No destination matched your search`}) 
        res.status(200).json({
            success: true , 
            total: search.length , 
            payload: search 
        })
        }

        if (req.query.location) {
            let search = await Destination.find({location: {$regex: new RegExp('^'+req.query.location+'.*', 'i')}}).exec();
            search = search.slice(0, 10);
            if (search.length < 1) return res.status(404).json({ success: false , msg: `No destination matched your search`}) 
            res.status(200).json({
                success: true , 
                total: search.length ,
                payload: search 
            })
        }
        
    } catch (err) {
        res.status(500).json({
            success: false , 
            msg: err 
        })
    }

}

const changePhotos = async (req , res) => {
    let path = ''

   try {

       const destination = await Destination.findById(req.params.id)
       if (!destination) return res.status(404).json({success: false , msg: `couldn't find a destination with this id: ${req.params.id}`})

       if (req.files) {
            
        req.files.forEach (function (files , index , arr) {
            path = path + 'http://localhost:5000/photos/' + files.filename + ','
        })
        path = path.substring(0 , path.lastIndexOf(","))

        }

       destination.photos = path.split(",")
       const updatedDestination = await destination.save()

       res.status(200).json({
           success: true , 
           msg: `The photos for the Destination with id ${req.params.id} were successfully changed` ,
           data: updatedDestination.photos 
       })


   } catch (error) {
       res.status(500).json({
           success: false , 
           msg: error  
       })
   }
}


module.exports = {
    createDestination,
    getDestinations,
    getSingleDestination,
    updateDestination,
    deleteDestination,
    searchDestinations,
    changePhotos
}