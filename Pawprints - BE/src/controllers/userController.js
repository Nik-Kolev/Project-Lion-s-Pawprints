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
        return res.status(400).json({ error: errors, code: 'INVALID_INPUT' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Email or Password are invalid', code: 'INVALID_CREDENTIALS' });
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({ error: 'Email or Password are invalid', code: 'INVALID_CREDENTIALS' });
        }

        const token = await tokenCreator(user)
        //TODO rework the needed data for the project!
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
        return res.status(400).json({ error: errors, code: 'INVALID_INPUT' });
    }

    try {

        if (password !== rePass) {
            return res.status(401).json({ error: 'Passwords do not match.', code: 'PASSWORD_MISMATCH' });
        }

        const user = await userModel.exists({ email })

        if (user) {
            return res.status(409).json({ error: 'Email is already registered.', code: 'EMAIL_CONFLICT' });
        }

        const hashedPass = await bcrypt.hash(password, 10)
        //TODO same as above, rework the model
        const newUser = await userModel.create({ firstName, lastName, email, phoneNumber, password: hashedPass });

        const token = await tokenCreator(newUser)

        const data = { firstName: newUser.firstName, lastName: newUser.lastName, _id: newUser._id, email: newUser.email, phoneNumber: newUser.phoneNumber, admin: newUser.admin, token }
        res.status(200).json(data);

    } catch (error) {
        errorHandler(error, res, req);
    }
});

userController.post('/logout', (req, res) => {
    if (req.headers.auth) {
        res.status(200).json({ message: 'Logout successful.', code: 'LOGOUT_SUCCESS' });
    } else {
        res.status(401).json({ error: 'Invalid or missing token!', code: 'INVALID_TOKEN' });
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
        return res.status(400).json({ error: errors, code: 'INVALID_INPUT' });
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
        return res.status(400).json({ error: errors, code: 'INVALID_INPUT' });
    }

    try {
        const user = await userModel.findOne({ email });

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid password.', code: 'INVALID_PASSWORD' });
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

module.exports = userController