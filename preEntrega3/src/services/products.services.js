import productModel from "../dao/models/product.model.js"

class ProductsServices { 

addProduct = async(product) => 
{
    if((!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.category)){
        console.error("Complete todos los campos")
    }
    const productList = this.getProducts()
    const valide = await productModel.findOne({code: product.code}).lean().exec()

    if(!valide){
        const newProduct = {title: product.title, description: product.description, code: product.code, price: product.price, status: true, stock: product.stock, category: product.category, thumbnail: product.thumbnail}
        const createdProduct = new productModel(newProduct)
        await createdProduct.save()
        return createdProduct.title
    }console.log('El producto ya fue ingresado');
}
getProducts = async (filter, search, options) => {
        try {
          if (filter === "stock") {
            const products = await productModel.paginate({stock:0}, options)
    
            if (!products) {
              throw new Error("THE DB IS EMPTY");
            }
    
            return products;
          }
    
          if (filter !== "stock") {
            const products = await productModel.paginate(search, options);
    
            if (!products) {
              throw new Error("THE DB IS EMPTY");
            }
    
            return products;
          }    
        } catch (error) {
          throw new Error(error.message);
        }
      };


getProductById = async (id) => {
    const product = await productModel.findOne({_id: id}).lean().exec()
    if(product){
        return product
    }else{console.log("el producto no existe")}
}
   
deleteProduct = async (id) =>{
    const product = await productModel.findOne({_id: id}).lean().exec()

    if((product)){ 
        await productModel.deleteOne({ _id: id })
    }else{console.log("el producto no existe")}
}

updateProduct = async (id, product) => {
    const productValidation = await productModel.findOne({_id:id}).lean().exec()
    if(productValidation){

        await productModel.updateOne({_id:id}, {$set:product})
        const productUpdated = await productModel.findOne({_id:id}).lean().exec()
        return productUpdated
    }
    
}


}

export const ProductsService = new ProductsServices();