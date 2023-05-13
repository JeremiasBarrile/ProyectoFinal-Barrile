const container = document.querySelector(".container-card");
const totalCarrito = document.querySelector("span");
const filtradorDeAbonos = document.querySelector("input#filterAbonos");
const abonos = [];
const URL = 'js/variables.json'

async function obtenerProductosAsync() {
  try {
      const rta = await fetch(URL)
      const data = await rta.json()
          abonos.push(...data)
          cargarAbonos(abonos)
  } catch (error) {
      console.log(error)
      container.innerHTML = retornoCardError()
  }
}

function filtrarAbonos(value) {
  let rta = abonos.filter((abono) =>
    abono.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );
  rta.length > 0 && cargarAbonos(rta);
}

filtradorDeAbonos.addEventListener("keyup", (e) => {
  filtrarAbonos(e.target.value);
});

function cantidadAbonosComprar() {
  totalCarrito.textContent = abonos.length;
}
cantidadAbonosComprar();

function cargarAbonos(array) {
  container.innerHTML = "";
  array.forEach((abono) => {
    container.innerHTML += returnCardHTML(abono);
  });
  botonClick();
}

function botonClick() {
  const botones = document.querySelectorAll(".boton-card");
  if (botones !== null) {
    for (const boton of botones) {
      boton.addEventListener("click", () => {
        let resp = abonos.find((abono) => abono.codigo === parseInt(boton.id));
        abonos.push(resp);
        cantidadAbonosComprar();
        carritoLS();
        notificar()
      });
    }
  }
}
function notificar() {
  Toastify({
      text: "El producto ha sido agregado al carrito.",
      className: "info",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: "blue"
      }
    }).showToast();
}

obtenerProductosAsync();
volverCarro();