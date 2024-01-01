import { carritoService, productosService, usuariosService } from "../services/factory.js"
import { PruebagetVerProductos } from "./productosroutes.controller.js"




export const getLogin = async(req,res) =>{
    res.render('login')
}
export const getRegister = async(req,res) =>{
    res.render('registro')

}

export const getUsuario = async (req, res) => {
    try {
        res.render('usuario');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const getproductos = async (req, res) => {
    try { 
        const productos = await PruebagetVerProductos(req, res);
        const productosData = productos.map(producto => ({
            title: producto.title,
            precio: producto.precio,
            imagen: producto.imagen,
            stock: producto.stock,
            id: producto._id
        }));  
        res.render('product', { productosAMostrar: productosData });  // Pasa la data como un objeto
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('Error interno del servidor');
        }
    }
};

export const getcarrito = async(req,res) =>{
    try {
        let carritoTotal = await carritoService.vertodos();
        const carritoData = await Promise.all(carritoTotal.map(async (carrito) => {
            const productos = await productosService.buscarProductoPorId(carrito.cantidad[0].producto);

            const productoData = productos.map(producto => ({

                imagen: producto.imagen,
            }))[0];
            return {
                id: carrito._id,
                codigo: carrito.codigo,
                cantidad: carrito.cantidad.length,
                imagen: productoData.imagen
            };
        }));
        
        res.render('carrito', { productosComprados: carritoData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error interno del servidor");
    }
};




export const getTicket = async(req,res) =>{
    let carritoTotal = await carritoService.verTiket()
    console.log("hola2");
    console.log(carritoTotal.carritoTotal);
    console.log(carritoTotal.precioTotal);
    console.log(carritoTotal.cantidadTotal);
    console.log("hola2");

    res.render('ticket', 
        {precioTotal: carritoTotal.precioTotal,
        cantidadTotal: carritoTotal.cantidadTotal
    });

}


