//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

//eventos
eventListeners();
function eventListeners(){

    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento este listo
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        //console.log(tweets);
        crearHTML();
    });
}

//funciones
function agregarTweet(e){
    e.preventDefault();
    //console.log('agregando tweet');

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    //validacion
    if(tweet === ''){
        mostrarError('El mensaje no puede ir vacio');
        return;
    }
    
    //añadir el tweet al arreglo
    const tweetOBJ = {
        id: Date.now(),
        tweet
    };

    tweets = [...tweets, tweetOBJ];

    //agregarlo al html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //añadirlo al HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(()=>{
       mensajeError.remove(); 
    },3000)
}

//muestras un listado de los tweets
function crearHTML(){

    limpiarHtml();

    if(tweets.length >0){
        tweets.forEach(tweet =>{

            //crear un boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';
            //añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            };
            //crear el html
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            //asignar el boton
            li.appendChild(btnEliminar);
            //lo inserto en el html
            listaTweets.appendChild(li);

        })
    };

    sincronizarStorage();
};

//agregar los tweet en el localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets' , JSON.stringify(tweets));
};

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

//limpiar el html
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    };
};