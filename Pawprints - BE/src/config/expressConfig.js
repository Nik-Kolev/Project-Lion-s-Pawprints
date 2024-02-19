require('dotenv').config();
const express = require('express')
const { port } = require('./config')
const { trimmer } = require('../middlewares/dataTrimmer')
const { authentication } = require('../middlewares/authentication')
const cors = require('cors');

module.exports = function expressConfig(app) {
    app.use(cors())
    app.use(express.json());
    app.use(trimmer)
    app.use(authentication)
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
}