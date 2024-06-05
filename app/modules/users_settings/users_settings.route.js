const express = require('express');
const router = express.Router();
const userSettingsController=require('./users_settings.controller')
const isAuthenticated = require('../../middlewares/authentication.middleware')
const uploadFileMiddleware=require('../../middlewares/uploadfile.middleware')
router.put('/:user_id',[isAuthenticated,uploadFileMiddleware.single('profile_picture')],userSettingsController.updateProfilePicture)

module.exports=router