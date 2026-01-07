const sequelize = require('../config/database');
const { DataTypes } = require ('sequelize');

const User = require('./users')(sequelize, DataTypes);
const Blog = require('./users')(sequelize, DataTypes);

User.hasMany(Blog);
