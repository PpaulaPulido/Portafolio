const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//dependencia de imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//dependendia para el source maps
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css(done) {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init()) //iniciliza el sourcemaps
        .pipe(sass().on('error', sass.logError)) // Manejo de errores para la compilación de Sass
        .pipe(postcss([autoprefixer()], cssnano()))
        .pipe(sourcemaps.write('.')) //lo guarda
        .pipe(dest('build/css'));
}

function imagenes() {
    return src('src/img/**/*') //incluye todos los archivos que estan dentro de esa carpeta
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function versionWepb() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

function versionAvif() {
    const opciones = {
        quality: 50 //con esto creo una version mas ligera
    };
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css); //buscar todos los archivos que tengan la extension .scss
    watch('src/img/**/*', imagenes).on('error', function (error) {
        console.error(error);
    });
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWepb = versionWepb;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWepb, versionAvif, css, dev);
