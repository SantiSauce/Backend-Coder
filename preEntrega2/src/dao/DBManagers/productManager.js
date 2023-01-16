import productModel from "../models/product.model.js"
import mongoose from "mongoose"
import express from 'express'



export class productManagerDB {


    getNextId = (list) =>{
        const count = list.length
        return (count >0) ? list[count-1].id + 1 : 1
    }//no funciona

    addProduct = async(product) => 
    {
        if((!product.title || !product.description || !product.price || !product.thumbnails || !product.code || !product.stock || !product.category)){
            console.error("Complete todos los campos")
        }
        const productList = this.getProducts()
        const valide = await productModel.findOne({code: product.code}).lean().exec()

        if(!valide){
            const newProduct = {title: product.title, description: product.description, code: product.code, price: product.price, status: true, stock: product.stock, category: product.category, thumbnails: product.thumbnails}
            const createdProduct = new productModel(newProduct)
            await createdProduct.save()
            return createdProduct.title
        }console.log('El producto ya fue ingresado');
    }

    getProducts = async () =>{
        return await productModel.find().lean().exec()
    }

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