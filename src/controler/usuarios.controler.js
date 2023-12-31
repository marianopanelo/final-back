import { usuariosService } from "../services/factory.js";



export const getVerTodosLosUsuarios = async (req, res) => {
    try {
        let usuarios = await usuariosService.verTodosLosusUarios();
        
        
        const usuariosdata = usuarios.map(usuario => ({
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
        }));        
        res.status(200).json(usuariosdata);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};


function usuarioNoSeConectoEnLosUltimosDias(usuario, dias) {
    const ultimaConexion = new Date(usuario.ultimaConexion);
    const hoy = new Date();
    const tiempoTranscurridoEnMilisegundos = hoy - ultimaConexion;
    const diasTranscurridos = tiempoTranscurridoEnMilisegundos / (1000 * 60 * 60 * 24);

    return diasTranscurridos >= dias;
}


export const deleteBorrarUsuariosInactivos = async (req, res) => {
    try {
        let usuarios = await usuariosService.verTodosLosusUarios();
        
        let usuariosInactivos = usuarios.filter(usuario => usuarioNoSeConectoEnLosUltimosDias(usuario, 2) && usuario.role !== 'admin');

        for (const usuario of usuariosInactivos) {
            await usuariosService.BorrarUsuario(usuario._id); 
        }

        res.status(200).json({ mensaje: 'Usuarios inactivos eliminados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


export const admin = async (req, res) => {
    let todosLosUsuarios = await usuariosService.verTodosLosusUarios();
        const usuariosdata = todosLosUsuarios.map(usuario => ({
            nombre: usuario.first_name,
            apellido: usuario.last_name,
            email: usuario.email,
            rolo : usuario.role,
            id : usuario._id

        }));
        res.render('admin',{usuarios: usuariosdata});  
};


export const cambiarRol = async (req, res) => {
    let rolACambiar = req.body
    let id = req.params.id
    let rolModificado = await usuariosService.cambiarRolUsuario(id , rolACambiar)
    console.log(rolModificado);
    res.send({status: "completado" , message: `rol actualizados con id ${id}`, data : rolModificado})
}




