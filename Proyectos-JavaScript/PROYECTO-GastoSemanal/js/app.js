//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

//clases
class Presupuesto{

    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.resultante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();

    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.resultante = this.presupuesto-gastado;
        //console.log(this.resultante);
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
    
}
class UI{

    insertarPresupuesto(cantidad){

        //extraemos el valor
        const {presupuesto, resultante} = cantidad;
        //agregar al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = resultante;

    }
    imprimirAlerta(mensaje, tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //mensaje de error
        divMensaje.textContent = mensaje;
        //insertar en el html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() =>{
            divMensaje.remove();
        },3000);
    }

    mostrarGastos(gastos){

        this.limpiahtml();
        //iterar sobre los gastos
        gastos.forEach( gasto =>{
            const {cantidad, nombre,id} = gasto;

            //crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            //nuevoGasto.setAttribute('data-id',id); es lo mismo que la linea 68
            nuevoGasto.dataset.id = id;
            //agregar al html
            nuevoGasto.innerHTML = `
            ${nombre} <span class = "badge badge-primary badge-pill"> $ ${cantidad}</span>
            `;
            //borrar html
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times'
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);
            //agregarlo al html el boton de borrar
            gastoListado.appendChild(nuevoGasto);
        })
    }

    limpiahtml(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    actualizarRestante(resultante){
        document.querySelector('#restante').textContent = resultante;

    }
    comprobarPresupuesto(presupuestoObj){
        const {presupuesto,resultante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        //comprobar 25%
        if((presupuesto/4) > resultante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto/2)> resultante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger' ,'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //si el totol es igual o menor a cero
        if(resultante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

//instanciar clases
const ui = new UI();

let presupuesto;

//funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
    // console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario)|| presupuestoUsuario <= 0){
        window.location.reload(); //recarga la pagina
    }

    //presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();
    
    //leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validiar
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorio', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    //generar un objeto con el gasto
    const gasto = {
        nombre,
        cantidad, 
        id: Date.now()
    } 

    //añadir un nuevo gasto
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('Gasto agregado');
    //imprimir los gastos
    const {gastos, resultante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(resultante);
    ui.comprobarPresupuesto(presupuesto);
    //reiniciar el formulario
    formulario.reset();
} 

function eliminarGasto(id){
    //los eliminar de la clase
    presupuesto.eliminarGasto(id);
    //eliminar los gastos del html
    const {gastos,resultante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(resultante);
    ui.comprobarPresupuesto(presupuesto);

}