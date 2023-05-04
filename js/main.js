const container = document.querySelector(".container-card");
const totalCarrito = document.querySelector("span");
const filtradorDeAbonos = document.querySelector("input#filterAbonos");
const carritoAbonos = volverCarro();

function filtrarAbonos(value) {
  let rta = abonos.filter((abono) =>
    abono.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );
  rta.length > 0 && cargarAbonos(rta);
}

filtradorDeAbonos.addEventListener("keyup", (e) => {
  filtrarAbonos(e.target.value);
});

function returnCardHTML(abono) {
  let { nombre, importe, codigo } = abono;
  return `
    <div class="card-abonos">
      <div class="nombre"><p>${nombre}</p></div>
      <div class="importe"><p>$ ${importe}</p></div>
      <div class="comprar"><button class="boton-card" id="${codigo}">Comprar</button></div>
    </div>
  `;
}

function cantidadAbonosComprar() {
  totalCarrito.textContent = carritoAbonos.length;
}

cantidadAbonosComprar();

function cargarAbonos(abono) {
  container.innerHTML = "";
  abono.forEach((abono) => {
    container.innerHTML += returnCardHTML(abono);
  });
  clickButton();
}

function clickButton() {
  const botones = document.querySelectorAll(".boton-card");
  if (botones !== null) {
    for (const boton of botones) {
      boton.addEventListener("click", () => {
        let resp = abonos.find((abono) => abono.codigo === parseInt(boton.id));
        carritoAbonos.push(resp);
        cantidadAbonosComprar();
        carritoLS();
      });
    }
  }
}
function carritoLS() {
  localStorage.setItem("carAbon", JSON.stringify(carritoAbonos));
}
function volverCarro() {
  return JSON.parse(localStorage.getItem("carAbon")) || [];
}

cargarAbonos(abonos);
volverCarro();
