var gulp = require('gulp');
var babel = require("gulp-babel");
var jasmine = require('gulp-jasmine');


gulp.task('default', function() {
   return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('run', function() {
  // TODO: run dist/bot.js
});