const Joi = require('joi');

// Validate User Creation
const schema ={
    createUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional(),
        last_name: Joi.string().min(3).optional(),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({'any.required':'Email is required','string.email':'Please enter a valid email id'}),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().allow('Male', 'Female', 'Other'),
        password: Joi.string().min(8).required().messages({'string.min':'Password must be at least 8 characters'}),

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
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({'any.required':'Email is required'}),
        password: Joi.string().required().messages({'any.required':'Password is required'}),

      }) ,
      getUser:Joi.object().keys({ 
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
      }),
      getAllUser:Joi.object().keys({ 
        user_id: Joi.string().required(),
      }),

} 
module.exports=schema