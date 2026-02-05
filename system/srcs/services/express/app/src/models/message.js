module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        read_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true,
        updatedAt: false
    });

    return Message;
}