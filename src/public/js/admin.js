document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.datos');
    const BorrarUsuario = document.querySelectorAll('.boton-borrar');

    forms.forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const usuarioId = form.querySelector('input[name="id"]').value;
            console.log(usuarioId);
            const nuevoRol = form.querySelector('input[name="rol"]').value;
            console.log(nuevoRol);
            try {
                const response = await fetch('/api/users/cambiarRol/' + usuarioId, {
                    method: 'POST',
                    body: JSON.stringify({ id: usuarioId, rol: nuevoRol }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                alert('Rol actualizado con éxito a ' + nuevoRol);
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                // Puedes manejar el error de acuerdo a tus necesidades
            }
        });
    });

    BorrarUsuario.forEach(boton => {
        boton.addEventListener('click', async () => {
            const usuarioId = boton.id;
            console.log('El ID del usuario es ' + usuarioId);

            try {
                const response = await fetch('/api/users/eliminarUsuario/' + usuarioId, {
                    method: 'delete',
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || 'Error en la solicitud');
                }

                alert('El usuario con ID ' + usuarioId + ' fue eliminado con éxito');
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                alert('Hubo un error al intentar eliminar el usuario');
            }
        });
    });
});