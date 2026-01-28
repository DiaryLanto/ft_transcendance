const sequelize = require('../config/database');
const { DataTypes } = require ('sequelize');

const User = require('./users')(sequelize, DataTypes);
const Blog = require('./blog')(sequelize, DataTypes);
const Post = require('./posts')(sequelize, DataTypes);
const Comment = require('./comments')(sequelize, DataTypes);

/** USER and BLOG relation **/
User.hasMany(Blog);
Blog.belongsTo(User, {
    foreingKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: "CASCADE" 
});

/** BLOG and POST relation **/
Blog.hasMany(Post);
Post.belongsTo(Blog);

/** COMMENT and USER relation **/
User.hasMany(Comment);
Comment.belongsTo(User);

/** POST and USER relation**/

User.belongsToMany(Post, {through: 'Clapping'});
Post.belongsToMany(User, {through: 'Clapping'});

User.belongsToMany(Post, {through: 'Library', as: "savedPost"});
Post.belongsToMany(User, {through: 'Library', as: "savingUser"});
/** COMMENT and POST relation **/
Comment.belongsTo(Post);
Post.hasMany(Comment);

module.exports = {
    sequelize,
    User,
    Blog,
    Post,
    Comment
};