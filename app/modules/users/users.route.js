const express = require('express');
const router = express.Router();
const userController=require('./users.controller')
const validateMiddleware = require('../../middlewares/validaterequest.middleware')
const userValidatorSchema=require('./users.validation')
const isAuthenticated = require('../../middlewares/authentication.middleware')

router.post('/login',[validateMiddleware.validateBody(userValidatorSchema.loginUser)],userController.loginUser)
router.get('/',[isAuthenticated,validateMiddleware.validateQuery(userValidatorSchema.getUser)],userController.getAllUser)
router.post('/',[validateMiddleware.validateBody(userValidatorSchema.createUser)],userController.createUser)
router.put('/:user_id',[isAuthenticated,validateMiddleware.validateBody(userValidatorSchema.updateUser)],userController.updateUser)
router.delete('/:user_id',[isAuthenticated,validateMiddleware.validateParam(userValidatorSchema.deleteUser)],userController.deleteUser)
router.get('/:user_id',[isAuthenticated,validateMiddleware.validateParam(userValidatorSchema.getAllUser)],userController.getUser)

module.exports=router