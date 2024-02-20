const router = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')

router.use('/users', userController)
router.use('/product', productController)

module.exports = router