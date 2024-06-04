const Joi = require('joi');

// Validate User Creation
const schema ={
    createUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional(),
        last_name: Joi.string().min(3).optional(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().allow('Male', 'Female', 'Other')
      }) ,
      updateUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional(),
        last_name: Joi.string().min(3).optional(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().allow('Male', 'Female', 'Other')
      })
} 
module.exports=schema