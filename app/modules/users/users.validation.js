const Joi = require('joi');
const genderEnums=['Male', 'Female', 'Other']
// Validate User Creation
const schema ={
    createUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional().messages({'string.min': 'Minimum 3 characters required for first name'}),
        last_name: Joi.string().min(3).optional().messages({'string.min': 'Minimum 3 characters required for last name'}),
        email: Joi.string().min(10).email({ tlds: { allow: false } }).required().messages({'any.required':'Email is required','string.email':'Please enter a valid email id','string.min': 'Minimum 10 characters required for email'}),
        phone_number: Joi.string().regex(/^\d{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        gender: Joi.string().required().valid(...genderEnums).messages({ 'any.only':'Gender must me one of these [Male, Female, Other]'}),
        password: Joi.string().min(8).required().messages({'string.min':'Password must be at least 8 characters'}),
        address:Joi.string().max(100).optional().messages({'string.max':'Maximun 100 characters allowed'}),

      }) ,
      updateUser:Joi.object().keys({ 
        first_name: Joi.string().min(3).optional().messages({'string.min': 'Minimum 3 characters required'}),
        last_name: Joi.string().min(3).optional().messages({'string.min': 'Minimum 3 characters required'}),
        email: Joi.string().min(3).email({ tlds: { allow: false } }).messages({'string.email':'Please enter a valid email id','string.min': 'Minimum 10 characters required'}),
        gender: Joi.string().optional().allow(...genderEnums).messages({ 'any.only':'Gender must me one of these [Male, Female, Other]'})
      }),
      deleteUser:Joi.object().keys({ 
        user_id: Joi.number().required(),
      }),
      loginUser:Joi.object().keys({ 
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({'any.required':'Email is required','string.email':'Please enter a valid email id'}),
        password: Joi.string().required().messages({'any.required':'Password is required'}),

      }) ,
      getUser:Joi.object().keys({ 
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
      }),
      getAllUser:Joi.object().keys({ 
        user_id: Joi.number().required(),
      }),

} 
module.exports=schema