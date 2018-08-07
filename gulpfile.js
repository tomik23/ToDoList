'use strict';

const gulp          = require('gulp');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const cssmin        = require('gulp-cssmin');
const browserSync   = require('browser-sync');

function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}

/**
 * js
 */
gulp.task('js', function () {
    return gulp.src('sources/js/**/*')
        .pipe(babel({ presets: ['env'] }))
        .on('error', swallowError)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build'));
});

/**
 * html
 */
gulp.task('html', function () {
    return gulp.src('sources/index.html')
        .pipe(gulp.dest('./build'));
});

/**
 * css
 */
gulp.task('css', function () {
    return gulp.src('sources/css/**/*')
        .pipe(cssmin())
        .pipe(gulp.dest('./build'));
});

/**
 * watch
 */
gulp.task('watch', function () {
    gulp.watch('sources/index.html', ['html', 'css', 'js']).on('change', browserSync.reload);
    gulp.watch('sources/css/**/*.css', ['css']).on('change', browserSync.reload);
    gulp.watch('sources/js/**/*.js', ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'html', 'css', 'js']);