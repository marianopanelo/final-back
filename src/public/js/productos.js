// productos.js

const irACarrito = document.getElementById('botonCarrito');
const finalizarCompra = document.getElementById('finalizarCompra');

document.addEventListener('DOMContentLoaded', () => {
    const botonesComprar = document.querySelectorAll('.boton-comprar');

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const productoId = boton.id;
            console.log('el id del producto es ' + productoId);
            
            try {
                const response = await fetch('/api/carrito/addProductoCarrito/' + productoId, {
                    method: 'POST',
                    body: JSON.stringify({ codigo: productoId}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                // Si la solicitud fue exitosa, muestra una alerta
                alert('el Producto con id ' + productoId + ' fue agregado al carrito con éxito');

            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                // Puedes manejar el error de acuerdo a tus necesidades
            }
        });
    });
});


irACarrito.addEventListener('click', () => {
    window.location.replace('/carrito');
});


finalizarCompra.addEventListener('click', () => {
    window.location.replace('/ticket');
});
