const irACarrito = document.getElementById('botonCarrito');
const finalizarCompra = document.getElementById('finalizarCompra');


document.addEventListener('DOMContentLoaded', () => {
    const botonesComprar = document.querySelectorAll('.boton-comprar');

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const productoId = boton.id;
            console.log('El id del producto es ' + productoId);

            try {
                const response = await fetch('/api/carrito/addProductosNoCarrito', {
                    method: 'POST',
                    body: JSON.stringify({ codigo: productoId }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                alert("producto agregado")

            } catch (error) {
                console.error('Error en la solicitud:', error.message);
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