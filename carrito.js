// Variables
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoTableBody = document.querySelector("#carrito tbody");
const totalCarritoSpan = document.querySelector("#total-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Función para actualizar el carrito
function actualizarCarrito() {
  // Limpiar la tabla y reiniciar el total
  carritoTableBody.innerHTML = "";
  let total = 0;

  // Generar filas para cada producto en el carrito
  carrito.forEach((producto, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>$${producto.precio}</td>
      <td>$${producto.precio * producto.cantidad}</td>
      <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
    `;
    carritoTableBody.appendChild(row);

    // Acumular el total
    total += producto.precio * producto.cantidad;
  });

  // Mostrar el total en su elemento correspondiente
  totalCarritoSpan.textContent = `$${total}`;

  // Asignar evento a botones de eliminar producto
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      eliminarProducto(index);
    });
  });
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1); // Eliminar producto por índice
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
  actualizarCarrito(); // Refrescar la tabla
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito"); // Eliminar carrito del localStorage
  carrito.length = 0; // Vaciar el array en memoria
  actualizarCarrito(); // Refrescar la tabla
}
if (carrito.length === 0) {
  vaciarCarritoBtn.disabled = true;  // Desactivar el botón si el carrito está vacío
} else {
  vaciarCarritoBtn.disabled = false;
}


// Asignar evento al botón "Vaciar carrito"
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}
if (carrito.length === 0) {
  carritoTableBody.innerHTML = "<tr><td colspan='5'>Tu carrito está vacío</td></tr>";
}


// Inicializar el carrito al cargar la página
actualizarCarrito();
if (carrito.length === 0) {
  carritoTableBody.innerHTML = "<tr><td colspan='5' class='text-center'>Tu carrito está vacío</td></tr>";
}

