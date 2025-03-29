// Success Response
export const successResponse = (res, data = {}, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

// Error Response
export const errorResponse = (res, message = "Internal Server Error", statusCode = 500, error = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message : null
    });
};
