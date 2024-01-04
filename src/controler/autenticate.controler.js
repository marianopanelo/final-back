export function auth(req, res, next) {
    if (req.session.role == "user" || req.session.role == "user premium" || req.session.role == "admin") {
        return next();
    } else {
        return res.status(403).render('errores', { error: 'Todavía no se ha iniciado sesión, por favor inicie sesión.' });
    }
}

export function usuarioPremium(req, res, next) {
    if (req.session.role == "user premium" || req.session.role == "admin") {
        return next();
    } else {
        return res.status(403).render('errores', { error: 'Todavía no se ha iniciado sesión o no tiene permisos suficientes.' });
    }
}

export function requireAdmin(req, res, next) {
    if (req.session.role === 'admin') {
        next(); // El usuario es administrador, permite el acceso
    } else {
        return res.status(403).render('errores', { error: 'Usuario no autorizado para ingresar a este recurso.' });
    }
}