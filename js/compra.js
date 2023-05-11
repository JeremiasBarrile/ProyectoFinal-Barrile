const tbody = document.querySelector("tbody")
const spanTotal = document.querySelector("span")
const btnComprar = document.querySelector("#btnComprar")

recuperarCarrito()
cargarCarrito()

function cargarCarrito() {
    tbody.innerHTML = ""
    if (carrito.length > 0) {
        carrito.forEach(producto => tbody.innerHTML += retornoFilaCheckoutHTML(producto) )
        activarClickEnBotonesDelete()
        spanTotal.innerText = calcularTotalCarrito().toLocaleString()
    } else {
        spanTotal.innerText = "0.00"
        tbody.innerHTML = ""
    }
}

function calcularTotalCarrito() {
    return carrito.reduce((acc, producto)=> acc + producto.precio, 0)
}

function activarClickEnBotonesDelete() {
    const botones = document.querySelectorAll("button.button-outline")
    if (botones) {
        for (let boton of botones) {
            boton.addEventListener("click", (e)=> {
                let indice = carrito.findIndex((prod)=> prod.id === parseInt(e.target.id))
                    if (indice > -1) {
                        carrito.splice(indice, 1) //elimino el producto del carrito
                        guardarCarrito()          //actualizo carrito en LocalStorage
                        cargarCarrito()           //refresco el carrito en pantalla
                    }
            })
        }
    }
}

btnComprar.addEventListener("click", ()=> {
    Swal.fire({title: 'Muchas gracias por su compra.', 
               icon: 'success', 
               confirmButtonText: 'Aceptar'
             })                                 //Agradezco la compra realizada.
    carrito.length = 0                          //reseteo la constante carrito
    localStorage.removeItem("carritoFrutas")    //Vacío localStorage
    cargarCarrito()
})