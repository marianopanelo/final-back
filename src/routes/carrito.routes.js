import { deleteEliminarcarito, deleteEliminarProducto, getVerCarrito, handlebars, postAgregarACarrito, postSumarCantidadCarrito } from "../controler/carritoroutes.controler.js";
import { Router, response } from "express";

const router = Router()

router.get ("/" , getVerCarrito)

router.post("/addProductosNoCarrito" , postAgregarACarrito)

router.post("/addProductoCarrito/:id",postSumarCantidadCarrito)

router.delete("/borrarProductoCarrito/:id" ,deleteEliminarProducto) 

router.delete("/borrartodoelcarrito" ,deleteEliminarcarito) 

router.get ("/realTimeProducts" ,handlebars)


export default router;