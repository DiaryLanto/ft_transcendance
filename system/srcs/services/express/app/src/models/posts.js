module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        clap_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return Post;
}