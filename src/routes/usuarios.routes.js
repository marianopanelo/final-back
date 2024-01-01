import { Router, response } from "express";
import { admin, cambiarRol, deleteBorrarUsuariosInactivos, eliminarUsuario, getVerTodosLosUsuarios } from "../controler/usuarios.controler.js";

const router = Router()

router.get("/",getVerTodosLosUsuarios);
// falta mandar el mail q se borro el usuario 
router.get("/borrarUsuariosInactivos",deleteBorrarUsuariosInactivos);

router.get("/admin",admin);

router.post("/cambiarRol/:id",cambiarRol);

router.delete("/eliminarUsuario/:id",eliminarUsuario);



export default router;