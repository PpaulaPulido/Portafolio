document.addEventListener("DOMContentLoaded", function () {

    function crearCard(datos) {
        // Crear elementos en HTML
        const swiper = document.createElement("div");
        swiper.classList.add("swiper-slide", "card");

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card-content");

        const titulo = document.createElement("h2");
        titulo.textContent = datos.titulo;

        const divImage = document.createElement("div");
        divImage.classList.add("image");

        const imagen = document.createElement("img");
        imagen.src = datos.imagenURL; 
        imagen.alt = datos.alt;

        const boton = document.createElement("button");
        boton.textContent = datos.botonTexto;

        // Agregar un evento click para redirigir a otra página
        boton.addEventListener("click", function () {
            window.location.href = datos.botonURL;
        });

        divImage.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(divImage);
        tarjeta.appendChild(boton);
        swiper.appendChild(tarjeta);

        const card = document.querySelector(".content");
        card.appendChild(swiper);
    }

    // Acceder a FirstProjects desde el ámbito global (window)
    const projects = window.FirstProjects || [];

    
    projects.forEach((project) => {
        crearCard(project);
    });
});
