const responseHelper=require('../../helpers/response.helper')
const responseMessageHelper=require('../../helpers/response_message.helper')
const logger=require('../../utils/logger')
const userSettingService=require('./users_settings.service')
const config=require('../../../config')
const userService=require('../users/users.service')
module.exports.updateProfilePicture=async(req,res)=>{
    try{
        let {user_id}=req.params
        if (!req.file)
            return responseHelper.badRequestError(res, 'Please select a file to upload')
        console.log(req.file)
        let validUserResult=await userService.findUser({id:user_id})
        if(!validUserResult)
            return responseHelper.badRequestError(res,responseMessageHelper.userMessages.NOT_FOUND)
        let findUserResult=await userSettingService.findUserSetting({user_id})
        if(findUserResult){
            let updateSettingResult=await userSettingService.updateUserSetting({profile_image:req.file.filename},{user_id})
            if(!updateSettingResult)
                return responseHelper.badRequestError(res,responseMessageHelper.userSettingMessages.CREATE_ERROR)

        }else{
            let createSettingResult=await userSettingService.createUserSetting({user_id,profile_image:req.file.filename})
            if(!createSettingResult)
                return responseHelper.badRequestError(res,responseMessageHelper.userSettingMessages.CREATE_ERROR)
        }
        /**File Upload to s3 function call  here - after successfull s3 upload the local copy of file will be deleted*/
        let response={
            profile_picture:`${config.IMG_BASE_URL}/${req.file.filename}`
        }
        return responseHelper.success(res,responseMessageHelper.userSettingMessages.CREATE_SUCCESS,response)
    }
    catch(error){
        console.log(error)
        logger.error(error.message)
        return responseHelper.serverError(res,responseMessageHelper.errorMessages.SERVER_ERROR)
        
    }
}