const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');

const Blog = sequelize.define("Blog", {
    blog_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.TEXT('tiny')
    },
    // user_id: {

    // }
});

module.exports = Blog;