const volverAComprar = document.getElementById('botonVolver');
const finalizarCompra = document.getElementById('finalizarCompra');

volverAComprar.addEventListener('click', () => {
    window.location.replace('/product');
});


finalizarCompra.addEventListener('click', () => {
    window.location.replace('/ticket');
});