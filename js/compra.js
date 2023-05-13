const tbody = document.querySelector("tbody")
const totalAbon = document.querySelector("span")
const botonComprar = document.querySelector("#botonComprar")
volverCarro()
cargarCarrito()

function cargarCarrito() {
    tbody.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach(abonos => tbody.innerHTML += devuelvoCarritoCompras(abonos) )
        botonEliminarClick()
        totalAbon.innerText = calPrecioAbonos().toLocaleString()
    } else {
        totalAbon.innerText = "0.00"
        tbody.innerHTML = ""
    }
}

function calPrecioAbonos() {
    return carrito.reduce((acc, abono)=> acc + abono.precio, 0)
}

function botonEliminarClick() {
    const botones = document.querySelectorAll("button.botonSeguirComprando")
    if (botones) {
        for (let boton of botones) {
            boton.addEventListener("click", (e)=> {
                let idc = carrito.findIndex((abn)=> abn.codigo === parseInt(e.target.codigo))
                    if (idc > -1) {
                        carrito.splice(idc, 1) 
                        carritoLS()          
                        cargarCarrito()          
                    }
            })
        }
    }
}

botonComprar.addEventListener("click", ()=> {
    Swal.fire({title: 'Muchas gracias por su compra.', 
               icon: 'success', 
               confirmButtonText: 'Aceptar'
             })                                
    carrito.length = 0                          
    localStorage.removeItem("carritoAbonos")    
    cargarCarrito()
})
;
function returnCardHTML(abono) {
    let {nombre, importe, codigo } = abono;
    return `
      <div class="card-abonos">
        <div class="nombre">${nombre}</div>
        <div class="importe">$ ${importe}</div>
        <div class="comprar"><button class="boton-card button-outline button-add" id="${codigo}">Comprar</button></div>
      </div>
    `;
  }
  const retornoCardError = ()=> {
    return `<div class="card-error">
                <h2>Houston, tenemos un problema 🔌</h2>
                <h3>No pudimos cargar los productos. 🤦🏻‍♂️</h3>
                <h3>Intenta nuevamente en unos instantes...</h3>
            </div>`}
            
const devuelvoCarritoCompras = (abono)=> {
  let {nombre,importe,codigo} = abono;
              return `<tr>
                          <td>${nombre}</td>
                          <td>${importe}</td>
                          <td><button id="${codigo}" class="button-outline">X</button></td>
                      </tr>`};
                      
const carritoLS = ()=> {
                        if (carrito.length > 0) {
                            localStorage.setItem("carritoFrutas", JSON.stringify(carrito))
                        }
                    }
                    
                    const volverCarro = ()=> {
                        const  guardadoLS= JSON.parse(localStorage.getItem("carritoAbonos"))
                        return guardadoLS
                    }
                     
                    const carrito = volverCarro() || []   ;
