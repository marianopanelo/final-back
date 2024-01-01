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
    let nuevoProducto = req.body
    if (!nuevoProducto.codigo){
        CustomError.createError({
            name: "error al cargar un producto al carrito " , 
            message: "valores imncompletos cargar codigo del producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    
    await carritoService.agregarAlCarrito(nuevoProducto)
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
    // no entiendo porque me dejo de entrar al populate , hace 5 minutos lo probe y andaba
    await carritoService.agregarAlCarritoPopulate(nuevoProducto)
    console.log(nuevoProducto);
}


export const postSumarCantidadCarrito = async (req, res) => {
    try {
        const id = req.params.id;
        const productoCarrito = await carritoService.buscarUnProductoCarrito(id);

        if (!productoCarrito) {
            const error = CustomError.createError({
                name: "error al sumarle cantidad al carrito",
                message: "no existe producto con ese id",
                code: EErrors.INVALID_TYPES_ERROR
            });
            res.status(400).send("Error al sumarle cantidad al carrito: " + error.message);
        } else {
            // Incrementar la propiedad 'cantidad' del producto
            productoCarrito.cantidad++;
            const productoConPopulate = await carritoService.agregarAlCarritoPopulate(productoCarrito);
            res.send(`La cantidad del producto con ID ${id} se incrementó en el carrito con populate`);
        }
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

    







