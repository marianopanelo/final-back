const volverAComprar = document.getElementById('botonVolver');
const finalizarCompra = document.getElementById('botonfinalizar');

document.addEventListener('DOMContentLoaded', () => {
    const botoneBorrar = document.querySelectorAll('.boton-borrar');

    botoneBorrar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const productoId = boton.id;
            console.log('El id del producto es ' + productoId);

            try {
                const response = await fetch('/api/carrito/borrarProductoCarrito/' + productoId , {
                    method: 'delete',
                    
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                alert("producto eliminado");

            } catch (error) {
                console.error('Error en la solicitud:', error.message);
            }
        });
    });
});

volverAComprar.addEventListener('click', () => {
    window.location.replace('/product');
});


finalizarCompra.addEventListener('click', () => {
    window.location.replace('/ticket');
});