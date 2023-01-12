import cartModel from "../models/carts.model.js"
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
        if(cart.products.length == 0){
            const newProduct = {product:productId, quantity:1}
            cart.products = newProduct
            await cart.products.save()
        }      

    




    }
}