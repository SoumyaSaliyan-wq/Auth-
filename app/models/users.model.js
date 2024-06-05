const db = require('../db/config')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const users = db.sequelize.define(
    'users', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING(100) },
    password: { type: DataTypes.TEXT, min: 8 },
    last_name: { type: DataTypes.STRING(100) },
    phone_number: { type: DataTypes.STRING(100), allowNull: false},
    email: { type: DataTypes.STRING(100), allowNull: false},
    address: { type: DataTypes.STRING(100) },
    is_active: { type: DataTypes.TINYINT, defaultValue: false },
    created_by: DataTypes.BIGINT,
    updated_by: DataTypes.BIGINT,
    deleted_by: DataTypes.BIGINT,
    deleted_at:DataTypes.STRING
}, {
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    createdBy:'created_by',
    updatedBy:'updated_by',
    deletedBy:'deleted_by',
    underscored: true,
    deletedAt: 'deleted_at'
});
users.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

users.validatePassword = async (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
};
module.exports = users