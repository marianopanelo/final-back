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
    try {
        let nuevoProducto = req.body;

        if (!nuevoProducto) {
            throw CustomError.createError({
                name: "error al cargar un producto al carrito",
                message: "valores imncompletos cargar codigo del producto",
                code: EErrors.INVALID_TYPES_ERROR,
            });
        }

        console.log(nuevoProducto.codigo);

        let buscarProducto = await carritoService.buscarUnProductoCarritoPorID(nuevoProducto.codigo);

        console.log(buscarProducto);

        if (!buscarProducto) {
            await carritoService.agregarAlCarrito(nuevoProducto)
            res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
            await carritoService.agregarAlCarritoPopulate(nuevoProducto)
            console.log(nuevoProducto);
        } else {
            let id = buscarProducto._id;

            // Obtener el producto actualizado antes de modificarlo
            let productoCarritoModificado = await carritoService.buscarUnProductoCarrito(id);

            console.log(productoCarritoModificado.cantidad[0].producto);
            productoCarritoModificado.cantidad.push({ producto: productoCarritoModificado.cantidad[0].producto });
            console.log(productoCarritoModificado);

            await carritoService.modificarUnProductoCarrito(id, productoCarritoModificado);

            // Obtener el producto actualizado después de modificarlo
            buscarProducto = await carritoService.buscarUnProductoCarritoPorID(nuevoProducto.codigo);

            res.send("el producto con el id : " + id + " fue agregado");
        }
    } catch (error) {
        // Manejar el error
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
};


export const postSumarCantidadCarrito = async (req, res) => {
    let id = req.params.id
    let productoCarrito = await carritoService.buscarUnProductoCarrito(id)
    console.log(productoCarrito.cantidad[0].producto);
    productoCarrito.cantidad.push( {producto : productoCarrito.cantidad[0].producto})
    let productoCarritoModificado = productoCarrito
    console.log(productoCarritoModificado);

    await carritoService.modificarUnProductoCarrito(id,productoCarritoModificado);

    if (!productoCarrito) {
        CustomError.createError({
            name: "error al sumarle cantidad al carrito " , 
            message: "no existe producto con ese id",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }else{
    await carritoService.buscarUnProductoCarrito(id)
    res.send("el producto con el id : " + id + " fue agregado" )
    }

}

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

    







