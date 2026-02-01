module.exports = (sequelize, DataTypes) => {
    const TotpEnrollement = sequelize.define ("TotpEnrollement", {
        id : {
            type: DataTypes.UUID,
            allowNull:false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        temp_secret : {
            type: DataTypes.STRING,
            allowNull: false
        },
        expires_at : {
            type: DataTypes.DATE,
            allowNull: false
        },
        attempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    });
    return TotpEnrollement;
}