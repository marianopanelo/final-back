import { Router, response } from "express";
import { admin, cambiarRol, deleteBorrarUsuariosInactivos, eliminarUsuario, getVerTodosLosUsuarios } from "../controler/usuarios.controler.js";
import { requireAdmin } from "../controler/autenticate.controler.js";

const router = Router()

router.get("/",requireAdmin,getVerTodosLosUsuarios);
// falta mandar el mail q se borro el usuario 
router.get("/borrarUsuariosInactivos",requireAdmin,deleteBorrarUsuariosInactivos);

router.get("/admin",requireAdmin,admin);

router.post("/cambiarRol/:id",requireAdmin,cambiarRol);

router.delete("/eliminarUsuario/:id",requireAdmin,eliminarUsuario);



export default router;