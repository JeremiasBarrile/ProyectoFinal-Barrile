function bloqueHTML(abono) {
  let {nombre, importe, codigo } = abono;
  return `
    <div class="card-abonos">
      <div class="nombre">${nombre}</div>
      <div class="importe">$ ${importe}</div>
      <span class="abonosCant"> 
       <label >cantidad:</label>
      <input  name="${codigo}" type="number" min= "0"> </input>
  
      </span>
     
      <div class="comprar"><button class="botonDeTarjetas" id="${codigo}">Comprar</button></div>
    </div>
  `;
}
const ErrorCargaHTML= ()=> {
  return `<div class="card-error">
              <h2>Tuvimos un problema❌</h2>
              <h3>prueba reiniciando la pagina...⏳</h3>
          </div>`}
          
const devuelvoCarritoCompras = (abono)=> {
  return `<tr>
  <td>${abono.nombre}</td>
  <td style="text-align:right">${abono.importe}</td>
  <td><button id="${abono.codigo}" class="boton-eliminar">Eliminar</button></td>
</tr>`
}
