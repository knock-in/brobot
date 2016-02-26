var gulp = require('gulp');
var babel = require("gulp-babel");
var jasmine = require('gulp-jasmine');
var watch = require("gulp-watch");
var gutil = require('gulp-util');

var SRC = 'src/**/*.js';
var DEST = 'dist';

gulp.task('default', function() {
    return gulp.src(SRC)
        .pipe(watch(SRC).on('change', function(path){
            gutil.log(`File ${path} has been changed`);
        }))
        .pipe(babel())
        .pipe(gulp.dest(DEST));
});
