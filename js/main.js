const container = document.querySelector("div.container-card#abonos2023");
const botonDeCarro = document.querySelector("div.btn-checkout");
const filtradorDeAbonos = document.querySelector("#filterAbonos");
var modal = document.getElementById("myModal");
 var btn = document.getElementById("myBtn");
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
      const input = document.querySelector(`input[name='${resp.codigo}']`) 
      console.log(input)
      let cantidad = input.value;
      for(let key = 0;key < cantidad;key ++){
         saveCarritoLS(resp);
      }
    });
  }
};

conseguirAbonos();
recCarroLS();

