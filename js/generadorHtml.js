function returnCardHTML(abono) {
    let {nombre, importe, codigo } = abono;
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
            
// const retornoFilaCheckoutHTML = (producto)=> {
//               return `<tr>
//                           <td>${producto.imagen}</td>
//                           <td>${producto.nombre}</td>
//                           <td>${producto.precio}</td>
//                           <td><button id="${producto.id}" class="button-outline">X</button></td>
//                       </tr>`}
