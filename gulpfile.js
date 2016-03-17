var gulp = require('gulp');
var babel = require("gulp-babel");
var jasmine = require('gulp-jasmine');
var watch = require("gulp-watch");
var gutil = require('gulp-util');
var del = require("del");
var shell = require("gulp-shell");

var SRC = 'src/**/*.js';
var DIST = 'dist';
var SPEC = 'spec/';
var DOC = 'docs/';

gulp.task('cleanDist', function() {
    del(DIST);
});

gulp.task('cleanDocs', function() {
    del(DOC);
});

gulp.task('cleanAll', ['cleanSrc', 'cleanDocs']);

gulp.task('buildDocs', ['cleanDocs'], shell.task(['jsdoc -c conf.json -d docs -t ./node_modules/ink-docstrap/template -R README.md -r .']));

gulp.task('buildDocs:push', shell.task(['git subtree push --prefix docs origin gh-pages']));

gulp.task('buildSrc', ['cleanDist'], function() {
    return gulp.src(SRC)
        .pipe(babel())
        .pipe(gulp.dest(DIST));
});

gulp.task('buildAll', ['buildSrc', 'buildDocs']);

gulp.task('autoBuild', ['buildSrc'], function() {
    return gulp.src(SRC)
        .pipe(watch(SRC).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(babel())
        .pipe(gulp.dest(DIST));
});

gulp.task('default', ['autoBuild']);

gulp.task('test', ['buildSrc'], function() {
   return gulp.src('spec/*')
        .pipe(jasmine());
});

gulp.task('lint', function() {
    
});