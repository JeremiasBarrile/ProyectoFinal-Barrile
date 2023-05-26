const tbody = document.querySelector("tbody");
const spanTotal = document.querySelector("span");
const form = document.querySelector("form#metodosPago")
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
const cancelar = document.getElementById("btnCancelar")
const finalizar = document.getElementById("btnFinalizar")

recCarroLS();
cargarCarrito();




btn.onclick = function() {
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

function cargarCarrito() {
  let carritoActual = recCarroLS();
  tbody.innerHTML = "";
  if (carritoActual.length > 0 ) {
    console.log(carritoActual);
    carritoActual.forEach(
      (abono) => (tbody.innerHTML += devuelvoCarritoCompras(abono))
    );
    botonEliminarAbonos();
    spanTotal.innerText = precioDelCarro(carritoActual).toLocaleString();
    btn.disabled = false
  } else {
    spanTotal.innerText = "0.00";
    tbody.innerHTML = "";
    btn.disabled = true 
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
  let carritoActual = recCarroLS()
  let eliminarIndice = carritoActual.findIndex(abono =>{
    return abono.codigo === aEliminar.codigo;
})
console.log("eliminarAbono",aEliminar,eliminarIndice,carritoActual)
if(eliminarIndice !== -1){
  carritoActual.splice(eliminarIndice,1)
  localStorage.setItem("carrito",JSON.stringify(carritoActual));
}
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Muchas gracias por su compra.",
      icon: "success",
      confirmButtonText: "Confirmar",
    });
    vaciarCarrito();
  });

form.addEventListener("reset", (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Se canceló su compra, le esperamos nuevamente.",
      icon: "error",
      confirmButtonText: "Confirmar",
    });
  });



const finalizarCompra = ()=>{
  finalizar.onclick = function(){
    modal.style.display= "none";
  }
  cancelar.onclick = function(){
    modal.style.display="none"
  }
}
finalizarCompra();
