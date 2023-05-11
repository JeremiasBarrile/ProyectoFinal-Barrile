const container = document.querySelector(".container-card");
const totalCarrito = document.querySelector("span");
const filtradorDeAbonos = document.querySelector("input#filterAbonos");
const carritoAbonos = volverCarro();
const abonos = [];
const URL = 'js/variables.json'

fetch(URL)
        .then((respuesta)=> respuesta.json())
        .then((data)=> abonos.push(...data))
        .then(()=> cargarAbonos(abonos))
        .catch((error)=> container.innerHTML = retornoCardError())

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
  let { imagen,nombre, importe, codigo } = abono;
  return `
    <div class="card-abonos">
      <div class="nombre">${nombre}</div>
      <div class="importe">$ ${importe}</div>
      <div class="comprar"><button class="boton-card" id="${codigo}">Comprar</button></div>
    </div>
  `;
}
const retornoCardError = ()=> {
  return `<div class="card-error">
              <h2>Houston, tenemos un problema 🔌</h2>
              <h3>No pudimos cargar los productos. 🤦🏻‍♂️</h3>
              <h3>Intenta nuevamente en unos instantes...</h3>
          </div>`}

function cantidadAbonosComprar() {
  totalCarrito.textContent = carritoAbonos.length;
}

cantidadAbonosComprar();

function cargarAbonos(abono) {
  container.innerHTML = "";
  abono.forEach((abono) => {
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
