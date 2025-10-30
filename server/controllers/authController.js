const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return next(new ErrorResponse('Email already in use', 400));

        const user = await User.create({ name, email, password, role });
        const token = createToken(user._id);

        // return token and user (omit password)
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(new ErrorResponse('Please provide email and password', 400));

        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(new ErrorResponse('Invalid credentials', 401));

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

        const token = createToken(user._id);
            res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

//get current user from token
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
