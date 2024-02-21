//variables

//se selecciona la etiqueta carrito del html
const carrito = document.querySelector('#carrito');
//seleccionar el contenedor donde estan los productos
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
//se selecciona en donde se colocaran los productos agregados
const listaCursos = document.querySelector('#lista-cursos');
//crear un arreglo para el carrito de compras
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //cunado agregas un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursoss del local storage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //se resetea el arreglo
        limpiarHTML();//eliminamos el html
        
    });
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        //con el target ingreso a ver a lo que hay en el html
        //console.log(e.target);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }    
}

//leer el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent, //textcontent extraigo el texto
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    //console.log(existe);
    if(existe){
        //actualizamos cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna el objeto que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elemento al arreglo del carrito
        //agregar los productos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //console.log(infoCurso);
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //limpiar el html 
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${imagen}" widht= "80">
           </td>
           <td>
                ${titulo}
           </td>
           <td>
                ${precio}
           </td>
           <td>
                ${cantidad}
           </td>
           <td>
                <a href=# class ="borrar-curso" data-id ="${id}">X</a>
           </td>
        `;
        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //agregar el carrito al local storage
    sincronizarStorage();
};

function sincronizarStorage(){
    localStorage.setItem('carrito' , JSON.stringify(articulosCarrito));
}

//eliminar los cursos del tbody
function limpiarHTML(){
    //forma lenta de limpiar el html
    contenedorCarrito.innerHTML = '';

    /*while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }*/
}

//eliminar un curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        //console.log(e.target.getAttribute('data-id'));
        const cursoId = e.target.getAttribute('data-id');
        //eliminar del arreglo articulos carrito por el data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //iterar sobre el carrito y mostrarlo en el html
    }
}



