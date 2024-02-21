// Definir opciones comunes
var commonSwiperOptions = {
  loop: true,
  grabCursor: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

// Función para crear una instancia de Swiper con opciones dadas
function createSwiperInstance(slidesPerView, spaceBetween, slidesPerGroup) {
  return new Swiper(".mySwiper", {
    ...commonSwiperOptions,
    slidesPerView: slidesPerView,
    spaceBetween: spaceBetween,
    slidesPerGroup: slidesPerGroup,
  });
}

// Crear una instancia de Swiper con opciones predeterminadas para dispositivos grandes
var swiper = createSwiperInstance(3, 30, 3);

// Verificar el tamaño de la pantalla y ajustar las opciones del Swiper según sea necesario
function checkScreenWidth() {
  if (window.innerWidth < 768) {
    swiper.destroy();
    swiper = createSwiperInstance(1, 15, 1);
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1050) {
    swiper.destroy();
    swiper = createSwiperInstance(1, 15, 1);
  } else {
    swiper.destroy();
    swiper = createSwiperInstance(3, 30, 3);
  }
}

// Llamar a la función para verificar el tamaño de la pantalla
checkScreenWidth();

// Actualizar Swiper cuando cambie el tamaño de la pantalla
window.addEventListener("resize", checkScreenWidth);
