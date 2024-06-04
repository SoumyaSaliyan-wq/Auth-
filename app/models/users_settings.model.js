const db = require('../db/config')
const { DataTypes } = require('sequelize');
const users=require('./users.model')
const users_settings = db.sequelize.define(
    'users_settings', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id:{ type: DataTypes.BIGINT },
    profile_image:{ type: DataTypes.STRING(100) },
    is_active: { type: DataTypes.TINYINT,defaultValue: false },
    created_by: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.STRING }
}, {
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at',
    underscored: true
});
//user associations
users.hasMany(users_settings, {
    as: 'user_settings_info',
    foreignKey: 'user_id',
    sourceKey: 'id'
});
users_settings.belongsTo(users, {
    as: 'userinfo',
    foreignKey: 'user_id',
    sourceKey: 'id'
});
module.exports = users_settings