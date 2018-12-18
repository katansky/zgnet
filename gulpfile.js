// npm init
// npm install --save-dev
//npm n install gulp --save-dev
// gulpfile.js

// npm install --save-dev gulp-concat-css
// npm install gulp-clean-css --save-dev
// npm install --save-dev gulp-autoprefixer
// npm install gulp-rename
// npm i browser-sync --save-dev
// npm install --save-dev gulp-uglify
// npm install --save-dev gulp-concat
// npm install --save-dev gulp-imagemin
// npm install gulp-uncss --save-dev



var gulp = require('gulp');
    autoprefixer = require('gulp-autoprefixer');
    rename = require("gulp-rename");
    browserSync = require ('browser-sync');
    less = require('gulp-less');
    uglify = require('gulp-uglify');
    concat = require('gulp-concat');
    gcmq = require('gulp-group-css-media-queries');
    cleanCSS = require('gulp-clean-css');





// gulpCSS
gulp.task('default', function () {
    return gulp.src(['./less/styles.less'])
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}))
});





// gulpJS
gulp.task('gulp-js', function(){
    gulp.src(['js/script.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./js'))
});





//gulpBrowser
gulp.task ('browserSync', function () {

    browserSync({

        server:{
            baseDir: 'D:/Programs/Openserver/OSPanel/domains/zg'
        },

        notify: false

    });

});



//gulpWatch
gulp.task ('watch', ['browserSync', 'default', 'gulp-js'], function () {

    gulp.watch('less/*.less', ['default'] );
    gulp.watch('js/*.js', ['gulp-js'] );
    gulp.watch('*.html', browserSync.reload);


});

