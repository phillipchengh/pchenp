var gulp = require('gulp');
var spawn = require('child_process').spawn;

var concat = require('gulp-concat');
var debug = require('gulp-debug');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var util = require('gulp-util');

var onError = function(err) {
  util.beep();
  console.log(err);
};

var STYLES_SRC = [
  'static/less/reset.less',
  'static/less/style.less'
];

var SCRIPTS_SRC = [
  'static/js/**'
];

var WATCH = {
  LESS: 'static/less/**',
  JS: 'static/js/**'
};

gulp.task('styles', function() {
  gulp.src(STYLES_SRC)
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(less({
    paths: ['static/less']
  }))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('static/'));
});

gulp.task('scripts', function() {
  gulp.src(SCRIPTS_SRC)
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(concat('script.js'))
  .pipe(gulp.dest('static/'));
});

gulp.task('watch', function() {
  gulp.watch(WATCH.LESS, ['styles']); 
  gulp.watch(WATCH.JS, ['scripts']);
});

gulp.task('default', ['watch', 'styles', 'scripts']);

gulp.task('auto-reload', function() {
  var process;
  function restart() {
    if (process) {
      process.kill();
    }

    process = spawn('gulp', ['default'], {stdio: 'inherit'});
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});
