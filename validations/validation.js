const Joi = require('joi');

const destinationValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required() ,
        location: Joi.string().min(2).required() ,
        details: Joi.string().min(2).required() ,
        otherInfo: Joi.string().min(2).required() , 
      //  reviews: Joi.string().min(2).required()  
    }).unknown();
        return schema.validate(user);
    }




module.exports= destinationValidation