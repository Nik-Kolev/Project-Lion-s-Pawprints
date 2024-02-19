const userController = require('express').Router()
const userModel = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const bcrypt = require('bcrypt')
const { tokenCreator } = require('../utils/tokenCreator')
const { isAuthorized, isGuest } = require('../middlewares/guards')
const Product = require('../models/Product')


userController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    let errors = [];

    Object.entries(req.body).forEach(([fieldName, value]) => {
        if (value === '') {
            let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            errors.push(`${errorName} is required.`);
        }
    });
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json('Имейлът или паролата са невалидни.')
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(404).json('Имейлът или паролата са невалидни.')
        }

        const token = await tokenCreator(user)
        const data = { firstName: user.firstName, lastName: user.lastName, _id: user._id, email: user.email, phoneNumber: user.phoneNumber, address: user.address, admin: user.admin, token }
        res.status(200).json(data);
    } catch (error) {
        errorHandler(error, res, req);
    }
});

userController.post('/register', isGuest, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, rePass } = req.body;

    let errors = [];

    Object.entries(req.body).forEach(([fieldName, value]) => {
        if (value === '') {
            let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            errors.push(`${errorName} is required.`);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {

        if (password !== rePass) {
            return res.status(404).json('Паролите не съвпадат.')
        }

        const user = await userModel.exists({ email })

        if (user) {
            return res.status(409).json('Имейлът е вече зает.')
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({ firstName, lastName, email, phoneNumber, password: hashedPass });

        const token = await tokenCreator(newUser)

        const data = { firstName: newUser.firstName, lastName: newUser.lastName, _id: newUser._id, email: newUser.email, phoneNumber: newUser.phoneNumber, admin: newUser.admin, token }
        res.status(200).json(data);

    } catch (error) {
        errorHandler(error, res, req);
    }
});

userController.post('/logout', (req, res) => {
    //Simple check if there is a token - blacklist or other shit I don`t know is needed for further implementation xD
    if (req.headers.auth) {
        res.status(200).json('Logout successful.')
    } else {
        res.status(404).json('Invalid Token!')
    }
})

userController.post('/changeInformation', isAuthorized, async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    let errors = [];

    Object.entries(req.body).forEach(([fieldName, value]) => {
        if (value === '') {
            let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            errors.push(`${errorName} is required.`);
        }
    });
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate({ _id: req.user._id }, { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber }, { new: true })

        const token = await tokenCreator(updatedUser)

        const data = { firstName: updatedUser.firstName, lastName: updatedUser.lastName, _id: updatedUser._id, email: updatedUser.email, phoneNumber: updatedUser.phoneNumber, admin: updatedUser.admin, token }
        res.status(200).json(data);

    } catch (error) {
        errorHandler(error, res, req);
    }
})


userController.post('/resetPassword', isAuthorized, async (req, res) => {
    const { password, newPassword, email } = req.body;

    let errors = [];

    Object.entries(req.body).forEach(([fieldName, value]) => {
        if (value === '') {
            let errorName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            errors.push(`${errorName} is required.`);
        }
    });
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const user = await userModel.findOne({ email });

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json('Невалидна парола.')
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await userModel.findByIdAndUpdate({ _id: req.user._id }, { password: newHashedPassword }, { new: true })

        const token = await tokenCreator(updatedUser)

        const data = { firstName: updatedUser.firstName, lastName: updatedUser.lastName, _id: updatedUser._id, email: updatedUser.email, phoneNumber: updatedUser.phoneNumber, admin: updatedUser.admin, token }
        res.status(200).json(data);
    } catch (error) {
        errorHandler(error, res, req);
    }
});

userController.post('/liked', async (req, res) => {
    try {
        const { isLiked, _id, userId } = req.body
        if (isLiked) {
            await userModel.findByIdAndUpdate({ _id: userId }, { $pull: { likedProducts: _id } }, { new: true });
            res.status(200).json('Продуктът е премахнат от любими.')
        } else {
            await userModel.findByIdAndUpdate({ _id: userId, likedProducts: { $ne: _id } }, { $push: { likedProducts: _id } }, { new: true });
            res.status(200).json('Продуктът е добавен в любими.')
        }
    } catch (error) {
        errorHandler(error, res, req)
    }

})

userController.get('/liked/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.user?._id
    try {
        const isLiked = !!(await userModel.exists({ _id: userId, likedProducts: id }));
        res.status(200).json(isLiked)
    } catch (error) {
        errorHandler(error, res, req)
    }
})

userController.get('/all-liked', async (req, res) => {
    try {
        const userId = req.user?._id;
        const page = Number(req.query.page) || 1;
        const limit = 9;
        const skip = (page - 1) * limit;

        const likedProducts = await userModel.findOne({ _id: userId })
            .select({ likedProducts: 1, _id: 0 })
            .lean()
            .then(doc => doc.likedProducts);
        const totalPages = Math.ceil(likedProducts.length / limit);
        const data = {
            products: likedProducts.slice(skip, limit + skip),
            totalPages: totalPages
        };

        res.status(200).json(data);
    } catch (error) {
        errorHandler(error);
    }
});


userController.post('/basket', async (req, res) => {
    try {
        const userId = req.user?._id
        const { action, productId, price } = req.body
        if (action == 'added') {
            const product = await Product.findById(productId);

            const data = {
                item: productId,
                price: price,
                imageUrl: product.imageUrl,
                productType: product.productType,
                name: product.name
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { $push: { storedProducts: data } },
                { new: true, fields: { storedProducts: { $slice: -1 } } }
            );

            const newProduct = updatedUser.storedProducts[0];

            res.status(200).json(newProduct);
        }
        if (action == 'remove') {
            await userModel.findByIdAndUpdate(userId, { $pull: { storedProducts: { _id: productId } } });
            res.status(200).json(`${productId} is ${action}d`)
        }
    } catch (error) {
        errorHandler(error, res, req)
    }
})

userController.get('/basket', async (req, res) => {
    try {
        const userId = req.user?._id
        const storedProducts = await userModel.findOne({ _id: userId }).select('storedProducts');
        res.status(200).json(storedProducts)
    } catch (error) {
        errorHandler(error, res, req)
    }
})

userController.post('/addressInformation', async (req, res) => {
    try {
        const { _id: userId } = req.user || {};

        const addressFields = ['city', 'street', 'streetNumber', 'block', 'entrance', 'floor', 'apartment', 'description'];
        const addressUpdate = addressFields.reduce((acc, field) => {
            if (req.body[field]) {
                acc[`address.${field}`] = req.body[field]
            };
            return acc;
        }, {});

        const updatedAddressInfo = await userModel.findByIdAndUpdate(userId, { $set: addressUpdate }, { new: true });
        const token = await tokenCreator(updatedAddressInfo);

        const { firstName, lastName, email, phoneNumber, address, admin } = updatedAddressInfo;
        const data = { firstName, lastName, _id: userId, email, phoneNumber, address, admin, token };

        res.status(200).json(data);
    } catch (error) {
        errorHandler(error, res, req);
    }
});

module.exports = userController