const container = document.querySelector("div.container#container");
const botonDeCarro = document.querySelector("div.btn-checkout");
const filtradorDeAbonos = document.querySelector("#filterAbonos");
const URL = "js/lista.json";
const abonos = [];

async function conseguirAbonos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    abonos.push(...data);
    cargarAbonos(abonos);
  } catch (error) {
    console.log(error);
    container.innerHTML = ErrorCargaHTML();
  }
}

const cargarAbonos = (lista) => {
  container.innerHTML = "";
  lista.forEach((abono) => {
    container.innerHTML += bloqueHTML(abono);
  });
  botonClick();
};

function filtrarAbonos(value) {
  let rta = abonos.filter((abono) =>
    abono.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );
  rta.length > 0 && cargarAbonos(rta);
}

filtradorDeAbonos.addEventListener("keyup", (e) => {
  filtrarAbonos(e.target.value);
});

const botonClick = () => {
  const botones = document.querySelectorAll(".botonDeTarjetas");
  for (boton of botones) {
    boton.addEventListener("click", (e) => {
      let resp = abonos.find((abono) => abono.codigo === parseInt(e.target.id));
      saveCarritoLS(resp);
      abonoAgregado();
    });
  }
};

function abonoAgregado() {
  Toastify({
    text: "El abono ha sido agregado al carrito.",
    className: "info",
    duration: 2000,
    gravity: "top",
    position: "right",
  }).showToast();
}

conseguirAbonos();
recCarroLS();

botonDeCarro.addEventListener("click", () => (location.href = "compra.html"));