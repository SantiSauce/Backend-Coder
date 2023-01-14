import cartModel from "../models/carts.model.js"
import productModel from "../models/product.model.js"
import mongoose from "mongoose"
import express from 'express'

export class cartManagerDB {


    getNextId = (list) =>{
        const count = list.length
        return (count >0) ? list[count-1].id + 1 : 1
    }

    getCarts = async () =>{
        return await cartModel.find().lean().exec()
    }

    getCartById = async (id) => {
        const cart = await cartModel.findOne({id: id}).lean().exec()
        if(cart){
            return cart
        }else{console.log("el carrito no existe")}
    }


    addCart = async() => {
    
        const cartsList = await cartModel.find().lean().exec()
        let id = this.getNextId(cartsList)
        const newCart = {id, products: []}
        const createdCart = new cartModel(newCart)
        await createdCart.save()
        console.log("El carrito se ha ingresado correctamente")
        }

    addProductToCart = async (id, productId) =>{

        const cart = await cartModel.findOne({id: id}).lean().exec()
        const valideProduct = await productModel.findOne({id:productId}).lean().exec()
        if(cart){//si existe carrito
            if(valideProduct){//si existe producto 
                const productoABuscarEnCarrito = await cartModel.findOne({id:id, products:{product: productId}}).lean().exec()
                if(cart.products.length==0){//si lista de productos = vacia
                    const newProduct = {product: valideProduct.id, quantity: 1, _id:valideProduct._id}
                    await cartModel.updateOne({id: id},{products:newProduct})             
                }
                if(productoABuscarEnCarrito){//si producto fue ingresado entonces sumo 1 a quantity
                    const producto=cart.products.findOne({product:productId})
                    const cantidad = producto.quantity
                    await cartModel.updateOne({id:id, products:{product: productId}},{$set:{products:{quantity:cantidad+1}}})//error
                }
                if(!productoABuscarEnCarrito){//producto no esta en carrito
                    const newProduct = {product: valideProduct.id, quantity: 1, _id:valideProduct._id}
                    cart.products.push(newProduct) 
                    await cartModel.updateOne({id: id},cart)           
                }

            }else{return console.log("Product not found");}           
        }else{return error}


    




    }
}