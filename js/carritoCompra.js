const tbody = document.querySelector("tbody");
const spanTotal = document.querySelector("span");
const btnComprar = document.querySelector(".button#btnComprar");

recCarroLS();
cargarCarrito();

function cargarCarrito() {
  let carritoActual = recCarroLS();
  tbody.innerHTML = "";
  if (carritoActual.length > 0) {
    console.log(carritoActual);
    carritoActual.forEach(
      (abono) => (tbody.innerHTML += devuelvoCarritoCompras(abono))
    );
    botonEliminarAbonos();
    spanTotal.innerText = precioDelCarro(carritoActual).toLocaleString();
  } else {
    spanTotal.innerText = "0.00";
    tbody.innerHTML = "";
  }
}

function precioDelCarro(carritoActual) {
  return carritoActual
    .reduce((acc, abono) => acc + abono.importe, 0)
    .toFixed(2);
}

function botonEliminarAbonos() {
  let carritoActual = recCarroLS();
  const botones = document.querySelectorAll("button.boton-eliminar");
  if (botones) {
    for (let boton of botones) {
      boton.addEventListener("click", (e) => {
        let elimElem = carritoActual.find(
          (abon) => abon.codigo === parseInt(e.target.id)
        );
        if (elimElem !== null) {
          eliminarAbono(elimElem);
          cargarCarrito();
        }
      });
    }
  }
}
function eliminarAbono(aEliminar) {
  localStorage.removeItem(aEliminar.codigo);
}

btnComprar.addEventListener("click", () => {
  let carritoActual = recCarroLS();
  Swal.fire({
    title: "Muchas gracias por su compra.",
    icon: "success",
    confirmButtonText: "Confirmar",
  });
  carritoActual.length = 0;
  localStorage.clear();
  cargarCarrito();
});
