export const generateUserErrorInfo = (user) => {
    return `One or more properties were incompleted or not valid.
    List of required properties:
        *first_name : needs to be a String, received ${user.first_name}
        *last_name : need to be a String, received ${user.last_name}
        *email: needs to be a String, received ${user.email}`
}

export const createProductErrorInfo = (product) => {
    return `One or more properties were incompleted or not valid.
    List of required properties:
        *title: need to be a String, received ${product.title}
        *description: need to be a String, received ${product.description}
        *price: need to be a Number, received ${product.price}
        *thumbnail: need to be an Arrray, received ${product.thumbnail}
        *code: need to be a String, received ${product.code}
        *stock: need to be a Number, received ${product.stock}
        *category: need to be a String, received ${product.category}`
}