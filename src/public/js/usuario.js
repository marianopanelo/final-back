document.addEventListener('DOMContentLoaded', function () {
    const irAProductosButton = document.getElementById('irAProductos');


    irAProductosButton.addEventListener('click', function () {
        window.location.href = '/product';
    });


    const buscarProductoPorCantidad = document.getElementById('buscarProductoPorCantidad');

    buscarProductoPorCantidad.addEventListener('submit', (e) => {
    e.preventDefault();
    const cantidadInput = buscarProductoPorCantidad.querySelector('[name="cantidad"]');
    const cantidad = cantidadInput.value;

    if (cantidad) {
        console.log(cantidad);

        window.location.href = `/api/productos/?limit=${cantidad}`;    
        } else {
            console.error('cantidad no es válido');
        }
    });


        const buscarProductoPorId = document.getElementById('buscarProductoPorId');

        buscarProductoPorId.addEventListener('submit', (e) => {
        e.preventDefault();
        const idInput = buscarProductoPorId.querySelector('[name="id"]');
        const id = idInput.value;

        if (id) {
            console.log(id);

            window.location.href = `/api/productos/${id}`;    
            } else {
                console.error('ID no es válido');
            }
    });
});
