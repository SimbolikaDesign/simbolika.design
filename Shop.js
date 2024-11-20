// Agregar productos al carrito
function agregarAlCarrito(producto) {
    // Recuperar el carrito actual del localStorage (si existe)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        // Si el producto ya existe, aumenta la cantidad
        existe.cantidad++;
    } else {
        // Si el producto no existe, se agrega con cantidad inicial 1
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Notificar al usuario
    alert("Producto agregado al carrito");
}