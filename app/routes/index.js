const express = require('express');
const router = express.Router();

const usersRouter=require('../modules/users/users.route')
const userSettingsRouter=require('../modules/users_settings/users_settings.route')
router.use('/user',usersRouter)
router.use('/user-settings',userSettingsRouter)

module.exports=router