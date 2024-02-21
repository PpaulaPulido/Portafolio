//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
//contenedor para el resultado
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear(); //getfullyear trae el año actual
const min = max-10;

//generar un objeto de busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};

//eventos
document.addEventListener('DOMContentLoaded' , () => {
    mostrarAutos(autos); //muestras los autos al cargar
    //llena las opciones de año
    llenarSelect();
});

//event listener para los select de busqueda
marca.addEventListener('change', (e) =>{
    datosBusqueda.marca =  e.target.value;
    //console.log(datosBusqueda);
    filtrarAuto();
});

year.addEventListener('change', (e) =>{
    datosBusqueda.year =  parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e) =>{
    datosBusqueda.minimo =  e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', (e) =>{
    datosBusqueda.maximo =  e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', (e) =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', (e) =>{
    datosBusqueda.transmision =  e.target.value;
    filtrarAuto();
});
color.addEventListener('change', (e) =>{
    datosBusqueda.color =  e.target.value;
    filtrarAuto();
});

//funciones
function mostrarAutos(autos){

    limpiarHTML(); //eliminar el html previo

    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');

    // Construir el HTML de los autos
    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}</p>
        `;
        contenedor.appendChild(autoHTML);
    })
}

//funcion para limpiar el html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
};
//genera los años del select
function llenarSelect(){

    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de años al select
    }
};

//funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    //console.log(resultado);
   
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }

};

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados para tu busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    } 
    return auto;
};
function filtrarYear(auto) {
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
};
function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
};
function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
};
function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
};
function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
};
function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
};