'use strict';

const gulp          = require('gulp');
const babel         = require('gulp-babel');
const concat        = require('gulp-concat');
const cssmin        = require('gulp-cssmin');
const sass          = require('gulp-sass');
const minify        = require('gulp-minify');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync');

function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}

let autoprefixerOptions = {
    browsers: ['> 1%', 'last 3 versions']
};

/**
 * js
 */
gulp.task('js', function () {
    return gulp.src('sources/js/**/*')
        .pipe(babel({ presets: ['env'] }))
        .on('error', swallowError)
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('./build'));
});

/**
 * sass
 */
gulp.task('scss', function () {
    return gulp.src('sources/scss/**/*')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(autoprefixer(autoprefixerOptions))
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
 * watch
 */
gulp.task('watch', function () {
    gulp.watch('sources/index.html', ['html', 'scss', 'js']).on('change', browserSync.reload);
    gulp.watch('sources/scss/**/*.scss', ['scss']).on('change', browserSync.reload);
    gulp.watch('sources/js/**/*.js', ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'html', 'scss', 'js']);