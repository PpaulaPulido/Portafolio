
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () =>{
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta('Agrega un termino de busqueda');
        return;
    }
    buscarImagenes();
}

function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-100');

    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setInterval(()=>{
            alerta.remove();
        },3000)
    }
    

}

function buscarImagenes(){
    
    const termino = document.querySelector('#termino').value;
    const key = '39401582-67c65828160043190134c3854';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

    //console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
        //console.log(resultado);
        totalPaginas = calcularPaginas(resultado.totalHits);
        //console.log(totalPaginas);
        mostrarImagenes(resultado.hits);
    })
}

function mostrarImagenes(imagenes){

    console.log(imagenes);

    limpiarHtml(resultado);

    //iterara sobre las imagenes
    imagenes.forEach(imagen =>{
        
        const {likes, views, previewURL, largeImageURL} = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Me Gusta</p>
                        <p class="card-text">${views} Vistas </p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                    </div>
                </div>
            </div>
            `;
    })
    limpiarHtml(paginacionDiv);
    imprimirPaginador();
}
function calcularPaginas(total){
    //creacion de paginacion
    return parseInt(Math.ceil(total/registroPorPagina));
}
//geneador  que va aregistrar la cantidad de elementos de acuerdos a las paginas
function *crearPaginador(total){

    for(let i = 1; i<= total; i++){
        yield i;
    }
}
function imprimirPaginador(){

    iterador = crearPaginador(totalPaginas);
    while(true){
        const {value,done} = iterador.next();

        if(done){
            return;
        }

        //generar boton por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mb-4', 'font-bold', 'uppercase', 'rounded');

        boton.onclick = ()=>{
            paginaActual = value;
            //console.log(paginaActual);
            buscarImagenes();

        }
        paginacionDiv.appendChild(boton);

    }
}

function limpiarHtml(selector) {
    while(selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}
