const users = require('../../models/users.model')

module.exports.createUser = async params => {
    try {
        params.password = users.hashPassword(params.password);
        const data = await users.create(params);
        return data;
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports.validateUserPassword=async(password,dbpassword)=>{
    try{
        const data=users.validatePassword(password,dbpassword)
        return data
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports.findUser = async (params) => {
    try {
        const data = await users.findOne({ where: { ...params } });
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}
module.exports.findAllUsers = async (params,pageOptions) => {
    try {
        const data = await users.findAll({
            where: { ...params }, 
            attributes:['email','phone_number','first_name','last_name'],
            offset: pageOptions.offset, limit: pageOptions.limit	
        });
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}
module.exports.findUserCount = async (params) => {
    try {
        const data = await users.count({ where: { ...params } });
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}
module.exports.updateUser = async (updateParams,whereParams)=>{
    try{
        const data = await users.update({...updateParams},{where:{...whereParams}})
        return data[0];
    }
    catch(error)
    {
        throw new Error(error)
    }  
}