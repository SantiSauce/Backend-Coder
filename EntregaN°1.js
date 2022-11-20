class productManager{

    constructor(products){
        this.products = products;
    }

    nextProductId =()=>{
        const count = this.products.length
        const nextId = (count >0) ? this.products[count-1].id + 1 : 1;
        return nextId;
    }    

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if ((title, description, price, thumbnail, code, stock)){

            const validate = this.products.find(codigo => codigo.code == code);
            
            if (!validate) {
                { 
                 const id = this.nextProductId()
                 const nuevoProducto = { 
                  id,
                  title,
                  description,
                  price,
                  thumbnail,
                  code,
                  stock,};  
                 this.products.push(nuevoProducto);}

            }else{console.log("El codigo ya está registrado")}  

        }else{console.log("Por favor, ingrese todos los datos"); }

    }

    getProduct = () => {
        console.log (this.products)
    }

    getProductById = (id) => {
        const producto = this.products.find(producto => producto.id == id) 
        if ((producto)){
            console.log(`Se ha encontrado el producto de ID ${id}`);
            console.log(producto);
        }else{console.log(`Not Found`);}
    }
}

let productos = [];
const productosEnEmpresa = new productManager(productos);

productosEnEmpresa.getProduct();
productosEnEmpresa.addProduct("remera","sin descripcion", "200", "sin imagen", "abc123", 25);
productosEnEmpresa.addProduct("zapas","sin descripcion", "200", "sin imagen", "4235", 25);
productosEnEmpresa.addProduct("cartera","sin descripcion", "200", "sin imagen", "abc123", 25);
productosEnEmpresa.getProduct();
productosEnEmpresa.getProductById(2);
productosEnEmpresa.getProductById(9);



