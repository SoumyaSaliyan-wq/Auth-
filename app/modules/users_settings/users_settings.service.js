const user_settings=require('../../models/users_settings.model')

module.exports.createUserSetting = async params => {
    try {
        const data = await user_settings.create(params);
        return data;
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports.updateUserSetting = async (updateParams,whereParams)=>{
    try{
        const data = await user_settings.update({...updateParams},{where:{...whereParams}})
        return data[0];
    }
    catch(error)
    {
        throw new Error(error)
    }  
}

module.exports.findUserSetting = async (params) => {
    try {
        const data = await user_settings.findOne({ where: { ...params } });
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}