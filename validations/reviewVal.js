const Joi = require('joi');

const reviewValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().required() ,
        star: Joi.number().required() ,
        review: Joi.string().required()  
    }).unknown();
        return schema.validate(user);
    }




module.exports= reviewValidation