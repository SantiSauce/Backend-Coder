export const ERRORS_ENUM = {
    INVALID_INPUT: {
        status: 400,
        code: 'INVALID_INPUT',
        message: 'Bad request'
    },
    NOT_FOUND: {
        status: 404,
        code: 'NOT_FOUND',
        message: 'The requested resource was not found'
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred'
    }
}
    /*"CART NOT FOUND": "CART NOT FOUND",
    "CART IS EMPTY": "CART IS EMPTY",
    "INVALID CART PROPERTY": "INVALID CART PROPERTY",
    "PRODUCT ALREADY IS IN CART": "PRODUCT ALREADY IS IN CART",
    "PRODUCT NOT FOUND": "PRODUCT NOT FOUND",
    "NOT PRODUCTS FOUND WITH CRITERIA": "NOT PRODUCTS FOUND WITH CRITERIA",
    "INVALID PRODUCT PROPERTY": "INVALID PRODUCT PROPERTY",
    "USER NOT FOUND": "USER NOT FOUND",
    "INVALID USER PROPERTY": "INVALID USER PROPERTY",
    "INVALID PASSWORD": "INVALID PASSWORD",
    "INVALID EMAIL": "INVALID EMAIL",*/