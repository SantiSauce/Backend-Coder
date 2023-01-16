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
        const cart = await cartModel.findOne({_id: id}).lean().exec()
        if(cart){
            return cart
        }else{console.log("el carrito no existe")}
    }


    addCart = async() => {
    
        const cartsList = await cartModel.find().lean().exec()
        const newCart = {products: []}
        const createdCart = new cartModel(newCart)
        await createdCart.save()
        console.log("El carrito se ha ingresado correctamente")
        }

    addProductToCart = async (id, productId) =>{

        const cart = await cartModel.findOne({_id: id}).lean().exec()
        const valideProduct = await productModel.findOne({_id:productId}).lean().exec()
        if(cart){//si existe carrito
            if(valideProduct){//si existe producto 
                const productoABuscarEnCarrito = await cartModel.findOne({_id:id, products:{product: productId}}).lean().exec()
                if(cart.products.length==0){//si lista de productos = vacia
                    const newProduct = {product: valideProduct._id, quantity: 1}
                    await cartModel.updateOne({_id: id},{products:newProduct})             
                }
                if(productoABuscarEnCarrito){//si producto fue ingresado entonces sumo 1 a quantity
                    const producto=cart.products.findOne({product:productId})
                    const cantidad = producto.quantity
                    await cartModel.updateOne({_id:id, products:{product: productId}},{$set:{products:{quantity:cantidad+1}}})//error
                }
                if(!productoABuscarEnCarrito){//producto no esta en carrito
                    const newProduct = {product: valideProduct._id, quantity: 1}
                    cart.products.push(newProduct) 
                    await cartModel.updateOne({_id: id},cart)           
                }

            }else{return console.log("Product not found");}           
        }else{return error}


    




    }
}