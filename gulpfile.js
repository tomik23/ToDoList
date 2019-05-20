const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
    styles: {
        src: './sources/scss/**/*',
        dest: './build'
    },
    script: {
        src: './sources/js/**/*',
        dest: './build'
    },
    html: {
        src: './sources/index.html',
        dest: './build'
    }
}

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

const autoprefixerOptions = {
    browsers: ['> 1%', 'last 3 versions']
};

// js
// js
function script() {
    return gulp
        .src(paths.script.src)
        .pipe(babel({ presets: ['@babel/env'] })).on('error', swallowError)
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.script.dest))
}

// sass 
function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(autoprefixer(autoprefixerOptions))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
}

// html
function html() {
    return gulp
        .src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
}

// watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.script.src, script);
    gulp.watch(paths.html.src, html);
}

const build = gulp.series(watch, gulp.parallel(styles, script, html));
// const build = gulp.parallel(styles, script, html, watch);

exports.watch = watch;
exports.build = build;