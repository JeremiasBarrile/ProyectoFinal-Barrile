const saveCarritoLS = (abonoSeleccionado) => {
    let carritoActual = recCarroLS();
    carritoActual.push(abonoSeleccionado)
    localStorage.setItem("carrito",JSON.stringify(carritoActual));
  };
  
  const recCarroLS = () => {
    let recCarrito = localStorage.getItem("carrito")
    if (recCarrito === null){
        return []
    }
   return JSON.parse(recCarrito);
  }
  function vaciarCarrito(){
    localStorage.setItem("carrito",JSON.stringify([]))
  }
  const carrito = recCarroLS();