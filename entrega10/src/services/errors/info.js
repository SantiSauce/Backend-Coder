export const generateUserErrorInfo = (user) => {
    return `One or more properties were incompleted or not valid.
    List of required properties:
        *first_name : needs to be a String, received ${user.first_name}
        *last_name : need to be a String, received ${user.last_name}
        *email: needs to be a String, received ${user.email}`
}

export const generateProductErrorInfo = (product) => {
    return `One or more properties were incompleted or not valid.
    List of required properties:
        *title: need to be a String, received ${product.title || undefined}
        *description: need to be a String, received ${product.description || undefined}
        *price: need to be a Number, received ${product.price || undefined}
        *thumbnail: need to be an Arrray, received ${product.thumbnail || undefined}
        *code: need to be a String, received ${product.code || undefined}
        *stock: need to be a Number, received ${product.stock || undefined}
        *category: need to be a String, received ${product.category || undefined}`
}