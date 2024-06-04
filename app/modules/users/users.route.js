const express = require('express');
const router = express.Router();
const userController=require('./users.controller')
const validateMiddleware = require('../../middlewares/validaterequest.middleware')
const userValidatorSchema=require('./users.validation')
router.post('/',[validateMiddleware.validateBody(userValidatorSchema.createUser)],userController.createUser)

module.exports=router