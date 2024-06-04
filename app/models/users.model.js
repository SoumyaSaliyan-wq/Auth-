const db = require('../db/config')
const { DataTypes } = require('sequelize');
const users = db.sequelize.define(
    'users', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    first_name:{ type: DataTypes.STRING(100) },
    last_name:{ type: DataTypes.STRING(100) },
    phone_number:{type:DataTypes.STRING(100),allowNull:false},
    email:{type:DataTypes.STRING(100),allowNull:false},
    address: { type: DataTypes.STRING(100) },
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

module.exports = users