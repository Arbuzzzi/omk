# OMK
####Должны быть установлены глобально:
- Gulp https://github.com/gulpjs/gulp

###Разворачивание проекта:
####1. Установить npm
`$ npm -i`
####2. Таск default запускает watch
`$ gulp`

или 

`$ gulp watch`

watch отслеживает изменения .js .css .scss .pug .html и запускает компиляцию

####3. Таск build запускает выгрузку проекта в папку dist 
`gulp build`

**НЕ КОМПИЛИРУЕТ ПРОЕКТ**
Build минимизирует файлы .js .css и выгружает проект в папку /dist
Перед выгрузкой проекта убедитесь что он уже скомпилирован

####4. Таск tinypng минимизирует изображения
`gulp tinypng`

Не забудьте вставить свой api key https://tinypng.com/developers
в gulpfile.js

    gulp.task('tinypng', function () {
        gulp.src([
            'app/img/**/*',
            '!app/img/**/*.svg'])
            .pipe(tingpng('api_key')) // вставьте свой api_key
            .pipe(gulp.dest('app/min/img'));
        gulp.src('app/img/**/*.svg')
            .pipe(gulp.dest('app/min/img'));
    });