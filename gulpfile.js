var gulp = require('gulp');
var babel = require("gulp-babel");
var jasmine = require('gulp-jasmine');
var watch = require("gulp-watch");
var gutil = require('gulp-util');
var del = require("del");
var shell = require("gulp-shell");
var eslint = require("gulp-eslint");

var SRC = 'src/**/*.js';
var DIST = 'dist';
var SPEC = 'spec/';
var DOC = 'docs';

gulp.task('cleanDist', function() {
    del(DIST);
});

gulp.task('cleanDocs', function() {
    del(DOC);
});

gulp.task('cleanAll', ['cleanSrc', 'cleanDocs']);

gulp.task('buildDocs', ['cleanDocs'], shell.task(['jsdoc -c conf.json -d docs -t ./node_modules/ink-docstrap/template -R README.md -r .', 'docco src/modules/exampleModule.js -o docs/docco/']));

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

gulp.task('default', ['buildSrc']);

gulp.task('test', ['buildSrc'], function() {
   return gulp.src('spec/*')
        .pipe(jasmine());
});

gulp.task('lint', function() {
    return gulp.src(SRC)
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

gulp.task('autoBuild:lint', function() {
    return gulp.src(SRC)
        .pipe(watch(SRC).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(shell(['eslint --quiet src/<%= file.relative %>'], {ignoreErrors: true}))
        .pipe(babel())
        .pipe(gulp.dest(DIST));
});