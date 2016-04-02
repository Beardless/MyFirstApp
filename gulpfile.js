'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');


gulp.task('prod', function () {
    gulp
    .src([
        './assets/css/bootstrap.min.css',
        './assets/css/bootstrap-theme.css',
        './assets/css/style.css'
    ])
    .pipe(concat('feedbackwithdeps.min.css'))
    .pipe(cssmin()).on('error', errorHandler)
    .pipe(gulp.dest('./dist/css'));

    gulp
    .src([
        './assets/css/style.css'
    ])
    .pipe(concat('feedback.min.css'))
    .pipe(cssmin()).on('error', errorHandler)
    .pipe(gulp.dest('./dist/css'));

    gulp
    .src([
        './assets/js/*',
        './app/main.js',
    ])
    .pipe(concat('feedbackwithdeps.min.js'))
    .pipe(uglify()).on('error', errorHandler)
    .pipe(gulp.dest('./dist/js'));

    gulp
    .src(['./assets/templates/*'])
    .pipe(gulp.dest('./dist/templates'));

    gulp
    .src([
        './app/**/*',
    ])
    .pipe(concat('feedback.min.js'))
    .pipe(uglify()).on('error', errorHandler)
    .pipe(gulp.dest('./dist/js'));

    return gulp;
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['assets/**/*', 'app/**/*'], ['prod']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'prod']);

// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
