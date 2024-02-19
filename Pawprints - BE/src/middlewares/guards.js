const { secret } = require('../config/config')
const jwt = require('../utils/jwtPromisify')

module.exports.isAuthorized = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    } else {
        next()
    }
}

module.exports.isGuest = async (req, res, next) => {
    if (req.user) {
        return res.status(403).json({ error: 'Already logged in' });
    } else {
        next();
    }
};
