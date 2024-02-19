const jwt = require('../utils/jwtPromisify')
const { secret } = require('../config/config')

module.exports.authentication = async (req, res, next) => {
    const token = req.headers['auth']
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, secret)
            if (decodedToken) {
                req.user = decodedToken
                next()
            } else {
                return res.status(401).json({ error: 'Unauthorized' })
            }
        } catch (err) {
            console.log('Authentication Error:', err)
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}