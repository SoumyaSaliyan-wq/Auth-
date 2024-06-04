const express = require('express');
const router = express.Router();
const userController=require('./users.controller')
const validateMiddleware = require('../../middlewares/validaterequest.middleware')
const userValidatorSchema=require('./users.validation')

router.get('/',[validateMiddleware.validateQuery(userValidatorSchema.updateUser)],userController.getAllUser)
router.post('/',[validateMiddleware.validateBody(userValidatorSchema.createUser)],userController.createUser)
router.put('/:user_id',[validateMiddleware.validateBody(userValidatorSchema.updateUser)],userController.updateUser)
router.delete('/:user_id',[validateMiddleware.validateParam(userValidatorSchema.deleteUser)],userController.deleteUser)
router.get('/:user_id',[validateMiddleware.validateParam(userValidatorSchema.updateUser)],userController.getUser)

module.exports=router