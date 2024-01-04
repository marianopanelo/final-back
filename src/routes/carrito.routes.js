import { auth } from "../controler/autenticate.controler.js";
import { deleteEliminarcarito, deleteEliminarProducto, getVerCarrito, handlebars, postAgregarACarrito, postSumarCantidadCarrito } from "../controler/carritoroutes.controler.js";
import { Router, response } from "express";

const router = Router()

router.get ("/" ,auth, getVerCarrito)

router.post("/addProductosNoCarrito" ,auth, postAgregarACarrito)

router.post("/addProductoCarrito/:id",auth,postSumarCantidadCarrito)

router.delete("/borrarProductoCarrito/:id" ,auth,deleteEliminarProducto) 

router.delete("/borrartodoelcarrito" ,auth,deleteEliminarcarito) 

router.get ("/realTimeProducts" ,auth,handlebars)


export default router;