const quoteController = require('express').Router()
const quoteModel = require('../models/Quote');
const { errorHandler } = require('../utils/errorHandler');

quoteController.post('/create-quote', async (req, res) => {
    console.log('asd')
    try {
        const { title, text } = req.body
        await quoteModel.create({ title, text })
        res.status(200).json('created')
    } catch (error) {
        errorHandler(error)
    }
})

quoteController.get('/getSingleQuote', async (req, res) => {

    try {
        const quote = await quoteModel.aggregate([{ $sample: { size: 1 } }])
        res.status(200).json(quote);
    } catch (error) {
        errorHandler(error, res, req);
    }
});

module.exports = quoteController