const fs = require ("fs");

class productManager{

    constructor(){
        this.products = []
        this.path = path
    }

    
    addProduct = async(title, description, price, thumbnail, code, stock) => 
    {

        if((!title || !description || !price || !thumbnail || !code || !stock))
            {console.log("Complete todos los campos")}

            if(fs.existsSync(this.path))
            {         
                const leer = await fs.promises.readFile(this.path, "utf-8")
                const listaDeProductos = JSON.parse(leer)
                const validate = listaDeProductos.find(codigo => codigo.code == code)

                if(!validate){
                    let idProducto = listaDeProductos[listaDeProductos.length - 1].id + 1;
                    let nuevoProducto = {id:idProducto, title, description, price, thumbnail, code, stock};
                    listaDeProductos.push(nuevoProducto)
                    await fs.promises.appendFile(this.path, JSON.stringify(listaDeProductos))

                }else{console.log("El producto ya fue ingresado");}             
            }if(!fs.existsSync(this.path)) { 
            const id = 1
            const nuevoProducto = {id, title, description, price, thumbnail, code, stock};
            this.products.push(nuevoProducto)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            }
            console.log("El producto se ha ingresado correctamente");

    }

    getProduct = () => {
        const listadoDeProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"))       
        console.log (listadoDeProductos)
    }

    getProductById = (id) => {
        const listadoDeProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const producto = listadoDeProductos.find(producto => producto.id == id) 
        if ((producto)){
            console.log(`Se ha encontrado el producto de ID ${id}`);
            console.log(producto);
        }else{console.log(`Not Found`);}
    }
    
    deleteProduct = (id) =>{
        const listadoDeProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const producto = listadoDeProductos.find(producto => producto.id == id) 
        if((producto)){ 
        const resultado = listadoDeProductos.filter(producto => producto.id != id)
        fs.writeFileSync(this.path, JSON.stringify(resultado))

        }else{console.log("el producto no existe");}}

    updateProduct = (id, campo) =>{
        const listadoDeProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        const producto = listadoDeProductos.find(producto => producto.id == id)
        if ((producto)){
            const dato = prompt("Dato a actualizar")    
            if(campo == "title"){
            listadoDeProductos[id-1].title = dato}
            if(campo == "description"){
            listadoDeProductos[id-1].description = dato}
            if(campo == "price"){ 
            listadoDeProductos[id-1].price = dato}
            if(campo == "thumbnail"){ 
            listadoDeProductos[id-1].thumbnail = dato}
            if(campo == "code"){ 
            listadoDeProductos[id-1].code = dato}
            if(campo == "stock"){ 
                listadoDeProductos[id-1].stock = dato}
                
                fs.writeFileSync(this.path, JSON.stringify(listadoDeProductos))
            }else{console.log("No existe el producto");}
        }
    }

    
    const path = "./listadoProductos.json"
    const allProducts = new productManager(path);
    allProducts.addProduct("remera","sin descripcion", "200", "sin imagen", "123", 25);
  