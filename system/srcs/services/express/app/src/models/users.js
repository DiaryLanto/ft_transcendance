module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    bio: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    follower_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totp_secret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    two_fa_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

return User;
}