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
                      </tr>`}
