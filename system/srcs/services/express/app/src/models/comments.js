const sequelize = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define ("Comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return Comment;
}