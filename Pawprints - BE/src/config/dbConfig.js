const mongoose = require('mongoose')
const { dbConnection } = require('./config')

module.exports = async function mongooseConfig() {
    try {
        await mongoose.connect(dbConnection)
        console.log('MongoDB is connected successfully!')
    } catch (err) {
        console.log('MongoDB connection error:', err)
        process.exit(1);
    }

}
