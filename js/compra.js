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
             })                                 //Agradezco la compra realizada.
    carrito.length = 0                          //reseteo la constante carrito
    localStorage.removeItem("carritoAbonos")    //Vacío localStorage
    cargarCarrito()
})