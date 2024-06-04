const Joi = require('joi');

// Validate User Creation
const schema ={
    createUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional(),
        last_name: Joi.string().min(3).optional(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().allow('Male', 'Female', 'Other'),
        password: Joi.string().min(8).required(),

      }) ,
      updateUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional(),
        last_name: Joi.string().min(3).optional(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().allow('Male', 'Female', 'Other')
      }),
      deleteUser:Joi.object().keys({ 
        user_id: Joi.string().required(),
      }),
      loginUser:Joi.object().keys({ 
        password: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
      }) ,
      getUser:Joi.object().keys({ 
        user_id: Joi.string().required(),
      }),
      getAllUser:Joi.object().keys({ 
        user_id: Joi.string().required(),
      }),

} 
module.exports=schema