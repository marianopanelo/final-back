import { Router, response } from "express";
import { deleteBorrarProducto, getBuscarProductoId, getVerProductos, postAgregarProducto, putModificarProducto } from "../controler/productosroutes.controller.js";
import errorHandler from "../services/error/middlewares/tomaDeErrores.js";
import { auth, requireAdmin, usuarioPremium } from "../controler/autenticate.controler.js";


const router = Router();

router.get ("/" ,auth, getVerProductos)

router.get("/:id",auth, getBuscarProductoId)

router.post ("/addproduct" ,usuarioPremium,postAgregarProducto)

router.put("/modificarproducto/:id" ,usuarioPremium,putModificarProducto)

router.delete ("/borrar/:productoId",requireAdmin,deleteBorrarProducto) 


router.use(errorHandler);

export default router;
