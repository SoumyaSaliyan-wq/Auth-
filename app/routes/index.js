const express = require('express');
const router = express.Router();

const usersRouter=require('../modules/users/users.route')
router.use('/user',usersRouter)
module.exports=router