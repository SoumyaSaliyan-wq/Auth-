const express = require('express');
const router = express.Router();
const userController=require('./users.controller')


router.get('/test',userController.test)

module.exports=router