var gulp = require('gulp');
var html = require('gulp-minify-html');
var cssMin = require("gulp-minify-css");
var addFile = require("gulp-concat");
var pngquant = require('gulp-imagemin');
var jsMin = require("gulp-uglify");
var browserify = require('gulp-browserify');

//html压缩
gulp.task('html-min', function(){
    gulp.src('src/index.html')
        .pipe(html())
        .pipe(gulp.dest('dist'));
});

//文件合并
gulp.task('add-file', function(){
    gulp.src('src/css/*.css')
        .pipe(addFile('all.min.css'))
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'))
});

//图片压缩
gulp.task('img-min', function(){
    gulp.src('src/images/*.jpg')
        .pipe(pngquant())
        .pipe(gulp.dest('dist/images'))
});

//js压缩并转换
gulp.task('browserify', function () {
    gulp.src('src/js/index.js')
        .pipe(addFile('index.js'))
        .pipe(browserify())
        .pipe(jsMin())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['html-min','add-file','img-min','browserify']);
