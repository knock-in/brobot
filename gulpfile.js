var gulp = require('gulp');
var babel = require("gulp-babel");
var mocha = require('gulp-mocha');
var watch = require("gulp-watch");
var gutil = require('gulp-util');
var del = require("del");
var shell = require("gulp-shell");
var eslint = require("gulp-eslint");


const dirs = {
    src: 'src/**/*.js',
    dist: 'dist/',
    test: 'test/*',
    docs: 'docs/'
};

gulp.task('cleanDist', function() {
    return del(dirs.dist);
});

gulp.task('cleanDocs', function() {
    return del(dirs.docs);
});

gulp.task('cleanAll', ['cleanSrc', 'cleanDocs']);

gulp.task('buildDocs', ['cleanDocs'], shell.task(['jsdoc -c conf.json -d docs -t ./node_modules/ink-docstrap/template -R README.md -r .', 'docco src/modules/exampleModule.js -o docs/docco/']));

gulp.task('buildDocs:push', shell.task(['git subtree push --prefix docs origin gh-pages']));

gulp.task('buildSrc', ['cleanDist'], function() {
    return gulp.src(dirs.src)
        .pipe(babel())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('buildAll', ['buildSrc', 'buildDocs']);

gulp.task('autoBuild', ['buildSrc'], function() {
    return gulp.src(dirs.src)
        .pipe(watch(dirs.src).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(babel())
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('default', ['buildSrc']);

gulp.task('test', ['buildSrc'], function() {
   return gulp.src(dirs.test)
        .pipe(mocha());
});

gulp.task('lint', function() {
    return gulp.src(dirs.src)
        .pipe(eslint()) 
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('autoBuild:lint', function() {
    return gulp.src(dirs.src)
        .pipe(watch(dirs.src).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(shell(['eslint --quiet src/<%= file.relative %>'], {ignoreErrors: true}))
        .pipe(babel())
        .pipe(gulp.dest(dirs.dist));
});