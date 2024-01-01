

export function auth(req, res, next){

    if (this.role == user || this.role == admin || this.role == admin) {
        return next();
    }else if (this.role == null) {
        return res.status(403).send("todavia no se logueo , por favor logueese");
    }else{
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}

export function requireAdmin(req, res, next) {
    const role = usuarioModel.buscarUsuarioPorId(req); // Reemplaza esto con tu lógica para obtener el rol del usuario

    if (role === 'admin') {
        next(); // El usuario es administrador, permite el acceso
    } else {
        res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}