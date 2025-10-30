const ErrorResponse = require('../utils/errorResponse');

    const errorHandler = (err, req, res, next) => {
    console.error('Error Handler:', err); // show in terminal

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;
