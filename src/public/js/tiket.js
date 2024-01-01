const finalizarCompra = document.getElementById('finalizarCompra');

document.addEventListener('DOMContentLoaded', () => {

   
        finalizarCompra.addEventListener('click', async () => {

            try {
                const response = await fetch('/api/carrito/borrartodoelcarrito/', {
                    method: 'delete',
                    
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                alert("compra finalizada");
                window.location.replace('/product');
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
            }
        });
});