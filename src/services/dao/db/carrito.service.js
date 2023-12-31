import { carritoModelo } from "../../../dao/models/carrito.models.js";
import { productosModelo } from "../../../dao/models/products.js";
import { carritoService, productosService } from "../../factory.js";


export default class carritoServiceMongo {
    constructor() { 
        console.log("carrito persistiendo en mongodb");
    }

    vertodos = async () => {
        let carritoTotal = await carritoModelo.find()
        return carritoTotal
    }

    agregarAlCarrito = async (id) => {
        try {
            const productoAAgregar = await productosModelo.findById(id);
            console.log("holaaaa3");
            console.log(id);
    

    
            const carrito = await carritoModelo.create({
                codigo: productoAAgregar._id,
            });
    
            // Insertar el carrito en la base de datos (si es necesario)
            await carritoModelo.insertMany(carrito);
    
            // Buscar el carrito recién creado y poblado con la información del producto
            const carritoPopulado = await carritoModelo
                .findById(carrito._id)
                .populate('cantidad._id'); // Popula usando la referencia correcta
    
            // Insertar el carrito poblado en la base de datos (si es necesario)
            await carritoModelo.insertMany(carritoPopulado);
    
            return carritoPopulado;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    agregarAlCarritoPopulate = async (nuevoProducto) => {
        console.log("pruebaaaaaa");
        console.log(nuevoProducto);
    let productoCarrito = await carritoModelo.findOne({codigo : nuevoProducto})
    let productoAAgregar = await productosModelo.findOne({codigo : nuevoProducto})

    await carritoModelo.updateOne({ codigo: nuevoProducto }, { $set: productoCarrito });
    let carritoYProducto = await carritoModelo.findOneAndUpdate({codigo : nuevoProducto}).populate(`cantidad.producto`)
    return carritoYProducto
    }

    buscarUnProductoCarrito = async (id) => {
        let productoCarrito = await carritoModelo.findOne({codigo : id})
        return productoCarrito
    }

    modificarUnProductoCarrito = async (id, productoCarritoModificado) => {
        await carritoModelo.updateOne( {codigo : id}, { $set: productoCarritoModificado });
    }

    eliminarProducto = async (id) => {
        await carritoModelo.deleteOne ( {_id : id} )
    }

    eliminarTodoElCarrito = async () => {
        await carritoModelo.deleteMany()
    }

    verTiket = async () =>{
        let carritoTotal = await carritoService.vertodos()
        console.log("los productos comprados son " + carritoTotal.length + " y cada producto tiene esta cantidad");
        let cantidadTotal = 0
        let precioTotal = 0
        for (let i = 0 ; i < carritoTotal.length  ; i++){
            let cantidadInicial = cantidadTotal 
            let precioInicial = precioTotal
            let idProducto = carritoTotal[i].cantidad[0].producto
            //console.log(idProducto);
            let pruductos = await productosService.buscarProductoPorId(idProducto)
            console.log(pruductos);
            
            let precioTotalDelArray = (pruductos[0].precio * carritoTotal[i].cantidad.length)
            console.log("precio de un jeugo " + pruductos[0].precio);
            console.log("precio de los mismos juegos " +  precioTotalDelArray);
            console.log("producto = " + pruductos[0].title + " la cantidad comprada es " + carritoTotal[i].cantidad.length + " el precio total es " + precioTotalDelArray);
            cantidadTotal = cantidadInicial + carritoTotal[i].cantidad.length
            precioTotal = precioInicial + precioTotalDelArray
            console.log("el total a pagar es :" + precioTotal);
            console.log("la cantidad total es: " + cantidadTotal);
            console.log("nombre de los juegos : " + pruductos[0].title);
            let stock = pruductos[0].stock - carritoTotal[i].cantidad.length;
            pruductos[0].stock = stock
            if (pruductos[0].stock <= 0) {
            /*tengo q cambiar lo de stock */    console.log( "el producto " + pruductos[0].nombre + " no tiene suficiente stock , el stock actual es de " + pruductos[0].stock);
            } else {
            let id = idProducto
            console.log(id);
            let productoCambiado = pruductos
            console.log(productoCambiado);
            //nose porque no me los temrina de modificar abajo 
            await productosService.modificarProducto(id , productoCambiado)
            }
        }
        return carritoTotal
    }
     

}
//modificarProducto
//productosService
//buscarProductoPorId