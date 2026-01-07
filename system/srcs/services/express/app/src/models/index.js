const sequelize = require('../config/database');
const { DataTypes } = require ('sequelize');

const User = require('./users')(sequelize, DataTypes);
const Blog = require('./blog')(sequelize, DataTypes);

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
    sequelize,
    User,
    Blog
};