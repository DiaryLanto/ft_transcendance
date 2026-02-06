const {User, Message} =  require('../models');
const AppError = require('../errors/appError');
const {Op} = require('sequelize');
const getMessagesBetween = async (me, other) => {
    const user = await User.findByPk(other);
    if (!user)
        throw (new AppError(404, "user not found"));
    console.log(me + " " + other);
    const messages = await Message.findAll({
        where: {
            [Op.or]:[
                {
                    [Op.and]:[
                        {sender:me},
                        {recipient:other}
                    ]
                },
                {
                    [Op.and]:[
                        {sender:other},
                        {recipient:me}
                    ]
                }
            ]
        }
    });
    return messages;
}

module.exports = {
    getMessagesBetween
};