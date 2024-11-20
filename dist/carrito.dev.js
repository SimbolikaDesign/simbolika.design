"use strict";

// Variables
var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
var carritoTableBody = document.querySelector("#carrito tbody");
var totalCarritoSpan = document.querySelector("#total-carrito");
var vaciarCarritoBtn = document.getElementById("vaciar-carrito"); // Función para actualizar el carrito

function actualizarCarrito() {
  // Limpiar la tabla y reiniciar el total
  carritoTableBody.innerHTML = "";
  var total = 0; // Generar filas para cada producto en el carrito

  carrito.forEach(function (producto, index) {
    var row = document.createElement("tr");
    row.innerHTML = "\n      <td>".concat(producto.nombre, "</td>\n      <td>").concat(producto.cantidad, "</td>\n      <td>$").concat(producto.precio, "</td>\n      <td>$").concat(producto.precio * producto.cantidad, "</td>\n      <td><button class=\"btn-eliminar\" data-index=\"").concat(index, "\">Eliminar</button></td>\n    ");
    carritoTableBody.appendChild(row); // Acumular el total

    total += producto.precio * producto.cantidad;
  }); // Mostrar el total en su elemento correspondiente

  totalCarritoSpan.textContent = "$".concat(total); // Asignar evento a botones de eliminar producto

  document.querySelectorAll(".btn-eliminar").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var index = e.target.dataset.index;
      eliminarProducto(index);
    });
  }); // Actualizar contador en el navbar

  actualizarContadorCarrito();
} // Función para eliminar un producto del carrito


function eliminarProducto(index) {
  carrito.splice(index, 1); // Eliminar producto por índice

  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage

  actualizarCarrito(); // Refrescar la tabla
} // Función para vaciar el carrito


function vaciarCarrito() {
  localStorage.removeItem("carrito"); // Eliminar carrito del localStorage

  carrito.length = 0; // Vaciar el array en memoria

  actualizarCarrito(); // Refrescar la tabla
}

if (carrito.length === 0) {
  vaciarCarritoBtn.disabled = true; // Desactivar el botón si el carrito está vacío
} else {
  vaciarCarritoBtn.disabled = false;
} // Asignar evento al botón "Vaciar carrito"


if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
} // Verificar si el carrito está vacío y mostrar mensaje


if (carrito.length === 0) {
  carritoTableBody.innerHTML = "<tr><td colspan='5' class='text-center'>Tu carrito está vacío</td></tr>";
} // Inicializar el carrito al cargar la página


actualizarCarrito(); // MERCADO PAGO
// Inicializar Mercado Pago

var mp = new MercadoPago("APP_USR-5e5dee21-a872-4114-9c8b-0d73363bee5d", {
  locale: "es-AR" // Argentina

});
document.getElementById("btn-pagar").addEventListener("click", function () {
  // Crear preferencia en el servidor o con enlaces directos
  fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "APP_USR-851629657633151-112002-bf5103980148e4f9a62c4cd42215436c-2109266914"
    },
    body: JSON.stringify({
      items: carrito.map(function (producto) {
        return {
          title: producto.nombre,
          quantity: producto.cantidad,
          unit_price: producto.precio,
          currency_id: "ARS"
        };
      }),
      back_urls: {
        success: "https://www.tusitioweb.com/descarga.html",
        // URL post pago exitoso
        failure: "https://www.tusitioweb.com/error.html",
        pending: "https://www.tusitioweb.com/pago-pendiente.html"
      },
      auto_return: "approved" // Redirige automáticamente tras el pago exitoso

    })
  }).then(function (response) {
    return response.json();
  }).then(function (preference) {
    mp.checkout({
      preference: {
        id: preference.id
      },
      autoOpen: true // Abre automáticamente el checkout

    });
  })["catch"](function (error) {
    return console.error("Error:", error);
  });
}); // Función que actualiza el contador del carrito en el navbar

function actualizarContadorCarrito() {
  var contador = document.getElementById("cart-count"); // Sumar las cantidades de todos los productos en el carrito

  var totalItems = carrito.reduce(function (total, producto) {
    return total + producto.cantidad;
  }, 0); // Actualizar el texto del contador

  contador.textContent = totalItems;
}