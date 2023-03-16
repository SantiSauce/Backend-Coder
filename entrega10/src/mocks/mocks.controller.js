import { generateProduct } from "../utils/products.mock.js"
export const showGeneratedProducts = async (req, res) => {
    let numOfProducts = 100
    let products = []
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())        
    }
    console.log(products);
    res.json({status: 'success', payload:products})
}