const router = require('express').Router()

const userController = require('./controllers/userController')
const quoteController = require('./controllers/quoteController')
const productController = require('./controllers/productController')

router.use('/users', userController)
router.use('/quote', quoteController)
router.use('/product', productController)

module.exports = router