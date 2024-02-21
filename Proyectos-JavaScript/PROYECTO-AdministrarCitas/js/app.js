//variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
let editando;

class Citas{

    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}
class UI{

    imprimirAlerta(mensaje, tipo){
        //crear un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block','col-12');

        //agregar una clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //mensaje de error
        divMensaje.textContent = mensaje;

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //quitar la alerta despues de 5 
        setTimeout(()=>{
            divMensaje.remove();
        },5000)

    }

    imprimirCitas({citas}){ //destructuring dentro de los parentesis
        this.limpiarHTML();

        citas.forEach(cita =>{

            const{mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-wight-bolder');
            //mascotaParrafo.textContent = mascota;
            mascotaParrafo.innerHTML = `${mascota}`;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class = "font-wight-bolder">Propietario:</span> ${propietario} ` ;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class = "font-wight-bolder">Telefono:</span> ${telefono} ` ;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class = "font-wight-bolder">Fecha:</span> ${fecha} ` ;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class = "font-wight-bolder">Hora:</span> ${hora} ` ;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class = "font-wight-bolder">Sintomas:</span> ${sintomas} ` ;
            
            //boton para eliminar citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = ()=> eliminarCita(id);
            
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos al div cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar al html
            contenedorCitas.appendChild(divCita);
        })
        
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//instanciar clases
const ui = new UI();
const administrarCitas = new Citas();

//eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input' , datosCitas);
    propietarioInput.addEventListener('input' , datosCitas);
    telefonoInput.addEventListener('input' , datosCitas);
    horaInput.addEventListener('input' , datosCitas);
    fechaInput.addEventListener('input' , datosCitas);
    sintomasInput.addEventListener('input' , datosCitas);
    formulario.addEventListener('submit', nuevaCita);
}

//objeto principal 
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha:  '',
    hora: '',
    sintomas:''
}

//funciones
function datosCitas(e){
    e.preventDefault();
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

//validar y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();
    //extxrear la informacion del objeto cita
    const{mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){

        //pasar el objeto de la cita de edicion
        administrarCitas.editarCita({...citaObj})

        ui.imprimirAlerta('Editado correctamente');

        //regresar el texto del boton al original
        formulario.querySelector('button[type ="submit"]').textContent = "Crear cita";
        //quitar modo de edicion
        editando = false;
    }else{
        //generar un id unico
        citaObj.id = Date.now();
        //creando una nueva cita
        administrarCitas.agregarCita({...citaObj});
        ui.imprimirAlerta('Se agrego correctamente');
    }
    
    //mostrar el el html las citas
    ui.imprimirCitas(administrarCitas);

    //reiniciar el objeto
    reiniciarObjeto();
    formulario.reset();

    
}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}
function eliminarCita(id){
    //eliminar cita
    administrarCitas.eliminarCita(id);
    //mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')
    //refrescar cita
    ui.imprimirCitas(administrarCitas);
}
function cargarEdicion(cita){

    const{mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;   

    //llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar el texto del boton
    formulario.querySelector('button[type ="submit"]').textContent = "Guardar Cambios";
    editando = true;

}