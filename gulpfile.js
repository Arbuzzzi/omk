var gulp 		 		 = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    ftp          = require('gulp-ftp'), // Заливаем файлы по ftp на хостинг
    cleanCSS 	 	 = require('gulp-clean-css'), // Минимизируем CSS 
    jsmin        = require('gulp-jsmin'), // Минимизируем JS
    gcmq 		 		 = require('gulp-group-css-media-queries'), // Группируем media-queries
    notify       = require('gulp-notify'), // Обработка ошибок
    //tingpng      = require('gulp-tinypng'), // Сжимаем изображения
    sourcemaps   = require('gulp-sourcemaps'),
    pug          = require('gulp-pug'),

    pugUse       = true, // если не исползуется pug поставить false
    sassUse      = true; // если не исползуется sass поставить false



gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.+(scss|sass)') // Берем источник
        .pipe(sass()
            .on( 'error', notify.onError(
              {
                message: "<%= error.message %>",
                title  : "Sass Error!"
              } ) )) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gcmq()) // Группируем медиа
        .pipe(autoprefixer(['last 15 versions', '> 0.1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
        
});

gulp.task('sass-watch', gulp.series('sass'), function (done) {
    // browserSync.reload();
    done();
});

gulp.task('pug-w', function buildHTML() {
  return gulp.src(['app/pug/**/*.pug', '!app/pug/**/_*.pug'])
  .pipe(pug({
    pretty: true,
  }).on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "pug Error!"
      })) )
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug-watch', gulp.series('pug-w'), function (done) {
    // browserSync.reload();
    done();
});

//.on('error', function(){console.log('error'); gulp.task('watch')})

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('ie9', function() {
    gulp.src('app/css/style-ie9.css').pipe(gulp.dest('app/ie9/css'));
});

gulp.task('watch', function() {
    if (sassUse) gulp.watch('app/css/style-ie9.css', gulp.series('ie9'));
    if (sassUse) gulp.watch('app/sass/**/**/*.+(scss|sass)', gulp.series('sass-watch')); // Наблюдение за sass файлами в папке sass
    if (pugUse) gulp.watch('app/**/*.pug', gulp.series('pug-watch')); // Наблюдение за PUG файлами в корне проекта
    if (!pugUse) gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    if (!sassUse) gulp.watch('app/**/*.css', browserSync.reload); // Наблюдение за CSS файлами в корне проекта
    gulp.watch('app/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('minjs', function () {
    return gulp.src('app/js/**/*.js')
      .pipe(jsmin())
      .pipe(gulp.dest('app/min/js'));
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});
gulp.task('clean-min', function() {
    return del.sync('app/min'); // Удаляем папку min перед сборкой
});

gulp.task('optimize', gulp.series('clean-min', 'minjs'), function () {
    return gulp.src([ // Берем CSS
        'app/css/**/**/*.css',
        'app/css/**/**/*.min.css',
        '!app/css/font.css',
        ])
        .pipe(gcmq()) // Группируем медиа
        //.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(cleanCSS({compatibility: 'ie8'})) // Минимизируем CSS
        .pipe(gulp.dest('app/min/css'));
        
    // gulp.src(['app/js/**/*.js']) // Минимизируем JS
    //     .pipe(jsmin())
    //     .pipe(gulp.dest('app/min/js'));

});


//
// gulp.task('tinypng', function () {
//     gulp.src([
//         'app/img/**/*',
//         '!app/img/**/*.svg'])
//         .pipe(tingpng('')) // вставьте свой api_key
//         .pipe(gulp.dest('app/min/img'));
//     gulp.src('app/img/**/*.svg')
//         .pipe(gulp.dest('app/min/img'));
// });

gulp.task('build', gulp.series('clean', 'optimize'), function() {
    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/min/css/**/*.css',
        'app/min/css/**/*.min.css',
        '!app//min/css/font.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    // var buildJs = gulp.src('app/js/**/*') // Переносим js в продакшен
    // .pipe(gulp.dest('dist/js'));

    var buildSlick = gulp.src('app/slick/**/*') // Переносим slick в продакшен
    .pipe(gulp.dest('dist/slick'));

    var buildJs = gulp.src('app/min/js/**/*') // Переносим js в продакшен
    .pipe(gulp.dest('dist/js'));

    var buildImg = gulp.src('app/img/**/*') // Переносим IMG в продакшен
    .pipe(gulp.dest('dist/img'));

    var buildImgMin = gulp.src('app/min/img/**/*') // Переносим IMG в продакшен
    .pipe(gulp.dest('dist/img'));

    var buildIe9 = gulp.src('app/ie9/**/*') // Переносим ie9 в продакшен
    .pipe(gulp.dest('dist/ie9'));

    var buildUi = gulp.src('app/jquery-ui-1.12.1.custom/**/*') // Переносим jquery-ui-1.12.1.custom в продакшен
    .pipe(gulp.dest('dist/jquery-ui-1.12.1.custom'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));

//  Команды в окне команд:
//  "gulp" - запускаем watch
//  "gulp build" - выгружаем готовый проект в папку dist
