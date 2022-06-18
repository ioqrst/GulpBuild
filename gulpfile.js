`use strict`;

const {
    app,
    dest,
    watch,
    series,
    parallel,
    src
} = require("gulp");

// Плагины
const fileInclude = require("gulp-file-include");
const htmlMin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const babel = require('gulp-babel');
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

// Обработка HTML
const html = () => {
    return src("./app/html/*.html")
        .pipe(fileInclude())
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest("./app"))
        .pipe(browserSync.stream());
}

// Обработка CSS
const scss = () => {
    return src("./app/scss/**/*.scss")
        .pipe(sass())
        .pipe(concat("style.min.css"))
        .pipe(csso())
        .pipe(dest("./app/css"))
}

// Обработка JS
const js = () => {
    return src("./app/js/app.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("./app/js"))
}

// Удаление данных
const clear = () => {
    return del("./dist");
}

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    })
}

// Копирование
const build = () => {
    return src(['./app/css/style.min.css', './app/fonts/**/*', './app/js/main.min.js', './app/*.html'], {
        base: 'app'
    }).pipe(dest('dist'));
}

// Наблюдатель
const watcher = () => {
    watch("./app/html/*.html", html).on("all", browserSync.reload)
    watch("./app/scss/**/*.scss", scss).on("all", browserSync.reload)
    watch("./app/js/app.js", js).on("all", browserSync.reload)
}

// Сборка
exports.default = series(
    clear,
    html,
    scss,
    // js,
    parallel(watcher, server)
)

exports.build = series(
    clear,
    parallel(html, scss, js, build)
)