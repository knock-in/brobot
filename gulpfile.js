var gulp = require('gulp');
var babel = require("gulp-babel");
var jasmine = require('gulp-jasmine');
var watch = require("gulp-watch");
var gutil = require('gulp-util');

var SRC = 'src/**/*.js';
var DEST = 'dist';

gulp.task('buildAll', function() {
    return gulp.src(SRC)
        .pipe(babel())
        .pipe(gulp.dest(DEST));
});

gulp.task('default', function() {
    return gulp.src(SRC)
        .pipe(watch(SRC).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(babel())
        .pipe(gulp.dest(DEST));
});

gulp.task('test', ['buildAll'], function() {
   gulp.src('spec/*')
        .pipe(jasmine());
});

// TODO: Gulp task for documentation: jsdoc -c conf.json -d docs -t ./node_modules/ink-docstrap/template -R README.md -r .
// TODO: Gulp task to push documentation to gh-pages branch: git subtree push --prefix docs origin gh-pages