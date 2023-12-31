import { carritoModelo } from "../dao/models/carrito.models.js"
import CustomError from "../services/error/customError.js"
import EErrors from "../services/error/enumeracionDeError.js"
//import { productosModelo } from "../dao/models/products.js"
import { carritoService } from "../services/factory.js"


// listo
export const getVerCarrito = async(req,res) =>{
    let carritoTotal = await carritoService.vertodos()
    return  res.send ( carritoTotal)
}

// listo .... ver q tengoq  cambiar q si el producto ya exsiste no volver a agregar 
export const postAgregarACarrito = async (req, res) => {
    let nuevoProducto = req.body;
    console.log(nuevoProducto);
    if (!nuevoProducto.codigo) {
        const error = CustomError.createError({
            name: "error al cargar un producto al carrito",
            message: "valores incompletos: cargar código del producto",
            code: EErrors.INVALID_TYPES_ERROR
        });
    
        return res.status(400).send("Error al cargar un producto al carrito: " + error.message);
    }

    await carritoService.agregarAlCarrito(nuevoProducto);
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito");

    await carritoService.agregarAlCarritoPopulate(nuevoProducto);
    console.log(nuevoProducto);
};


// listo
export const postSumarCantidadCarrito = async (req, res) => {
    try {
        let id = req.params.id;
        let productoCarrito = await carritoService.buscarUnProductoCarrito({codigo : id});
        console.log("hola");
        console.log(productoCarrito);
        console.log("hola 2");
        if (productoCarrito) {
            if (productoCarrito !== null) {
                await carritoService.agregarAlCarritoPopulate(id);

                res.send("Operación completada");
            } else {
                console.error('El producto en productoCarrito es null');
                res.status(500).send("Error interno del servidor");
            }
        } else {
            await carritoService.agregarAlCarrito(id);
            };
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error interno del servidor");
    }
};


//listo
export const deleteEliminarProducto = async (req, res) => {
    let id = req.params.id
    await carritoService.eliminarProducto (id)
    res.send({ status: "Success", message: " el producto con id " + req.params.id + " fue Eliminado del carrito " });
}
//listo
export const deleteEliminarcarito = async (req, res) => {
    await carritoService.eliminarTodoElCarrito()
    res.send({ status: "Success", message: " el carrito fue eliminado " });
}
// listo
export const handlebars = async (req, res) => {
    res.render ("realTimeProducts", {productoCarritoNombre} )
}

    







