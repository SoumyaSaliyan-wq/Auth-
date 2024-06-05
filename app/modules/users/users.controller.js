const logger=require('../../utils/logger')
const userService=require('./users.service')
const responseHelper=require('../../helpers/response.helper')
const responseMessageHelper=require('../../helpers/response_message.helper')
const jwtUtil=require('../../utils/jwt')

/**
 * 
 * @param {req.body} req 
 * @param {email,phone_number,address,first_name,last_name} res 
 */
module.exports.loginUser=async(req,res)=>{
    try{
        logger.info('loginUser Request:')
        let findUserResult=await userService.findUser({email:req.body.email})
        if(!findUserResult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.NOT_FOUND)
        let validateUserResult=await userService.validateUserPassword(req.body.password,findUserResult.password)
        if(!validateUserResult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.INVALID_CREDENTIALS)
        let token = await jwtUtil.generateToken({id:findUserResult.id, phone_number:findUserResult.phone_number});
		if (!token) {
            console.log(token)
			return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR);
		}
        let response={
            id:findUserResult.id,
            first_name:findUserResult.first_name,
            last_name:findUserResult.last_name,
            address:findUserResult.address,
            email:findUserResult.email,
            phone_number:findUserResult.phone_number,
            access_token:token
        }
        return responseHelper.success(res,responseMessageHelper.userMessages.LOGIN_SUCCESS,response)
    }
    catch(error){
        logger.error(`loginUser Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}
/**
 * 
 * @param {req.body} req 
 * @param {id,email,phone_number,address,first_name,last_name} res 
 */
module.exports.createUser = async (req, res) => {
    try {
        logger.info("createUser Request:")
        let { phone_number } = req.body
        let findUserResult = await userService.findUser({ phone_number })
        console.log(findUserResult)
        if (findUserResult)
            return responseHelper.badRequestError(res, responseMessageHelper.userMessages.DUPLICATE)
        let createUserResult = await userService.createUser(req.body)
        if (!createUserResult)
            return responseHelper.badRequestError(res, responseMessageHelper.userMessages.CREATE_ERROR)

        
        let response = {
            id: createUserResult.id,
            email: createUserResult.email,
            phone_number: createUserResult.phone_number,
            address: createUserResult.address,
            first_name: createUserResult.first_name,
            last_name: createUserResult.last_name,
        }
        return responseHelper.success(res, responseMessageHelper.userMessages.CREATE_SUCCESS, response)
    }
    catch (error) {
        logger.error(`createUser Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}
/**
 * 
 * @param {user_id} req 
 * @param {*} res 
 */
module.exports.updateUser=async(req,res)=>{
    try{
        logger.info("Updating user request")
        let updateUserResult=await userService.updateUser({...req.body,updated_by:req.user_id},{id:req.params.user_id})
        console.log(updateUserResult)
        if(!updateUserResult)
            return responseHelper.accepted(res,responseMessageHelper.userMessages.UPDATE_ERROR)

        return responseHelper.success(res,responseMessageHelper.userMessages.UPDATE_SUCCESS,req.body)

    }
    catch (error) {
        logger.error(`updateUser Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}
/**
 * 
 * @param {user_id} req 
 * @param {email,phone_number,first_name,last_name} res 
 */
module.exports.getUser=async(req,res)=>{
    try{
        logger.info("getUser request")
        let findUserResult=await userService.findUserSetting({id:req.params.user_id},['email','first_name','last_name','phone_number','address'])
        if(!findUserResult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.NOT_FOUND)
       
        return responseHelper.success(res,responseMessageHelper.userMessages.FETCH_SUCCESS,findUserResult)
    }
    catch (error) {
        logger.error(`getUser Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR,findUserResult)
    }
}
/**
 * 
 * @param {page,limit} req 
 * @param {[]} res 
 */
module.exports.getAllUser=async(req,res)=>{
    try{
        logger.info("getAllUsers Request")
        let {limit=10,page=1}=req.query
		limit = +limit;
        page = page === 0 ? 1 : +page;
        const offset = (page - 1) * limit;

        const pageOptions = {
            offset: offset,
            limit: limit,
            page
        }
        
        let promiseResult = await Promise.all([
          await userService.findAllUsers({}, pageOptions),
          await userService.findUserCount(),
        ])
        let totalPages = Math.ceil(promiseResult[1] / pageOptions.limit);
        let has_next_page = pageOptions.page < totalPages;
        let responseData = {
            count: promiseResult[1],
            data:promiseResult[0],
            has_next_page
        }
        return responseHelper.success(res,responseMessageHelper.userMessages.FETCH_SUCCESS,responseData)
    }
    catch (error) {
        logger.error(`getAllUsers Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}
/**
 * 
 * @param {user_id} req 
 * @param {*} res 
 */
module.exports.deleteUser=async(req,res)=>{
    try{
        logger.info("deleteUser request")
        let {user_id}=req.params
        console.log(user_id)
        let finduserresult=await userService.findUser({id:user_id})
        if(!finduserresult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.NOT_FOUND)
        let deleteUserresult=await userService.deleteUser({id:user_id})
        if(!deleteUserresult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.DELETE_ERROR)
        return responseHelper.success(res,responseMessageHelper.userMessages.DELETE_SUCCESS,{})

    }
   catch (error) {
        logger.error(`deleteUser Error ${error.message}`)
        return responseHelper.serverError(res, responseMessageHelper.errorMessages.SERVER_ERROR)
    }
}