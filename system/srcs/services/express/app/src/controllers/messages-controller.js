const {getMessagesBetween} = require('../services/message-services');

const handleMessageFetch = async (req, res, next) => {
    try {
        const me = req.user.sub;
        const other = req.params.userId;
        const messages = await getMessagesBetween(me, other);
        res.status(200).json({messages:messages});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleMessageFetch
};