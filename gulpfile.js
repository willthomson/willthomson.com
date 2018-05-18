let babel = require('gulp-babel');
let clean = require('gulp-clean');
var extend = require('deep-extend');
var fs = require('fs');
let gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var readdirRecursive = require('fs-readdir-recursive');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
let uglify = require('gulp-uglify');

var config = {
  JS_SOURCE_DIR: './source/js/composite/',
  JS_SOURCES: [
    './partials/**/*.js',
    './source/js/composite/**/*.js',
  ],
  JS_OUT_DIR: './dist/js/composite/',
  JS_OPTIONS: {
    uglify: {
      mangle: false
    }
  },
  SASS_SOURCE_DIR: './source/sass/composite/**/*.scss',
  SASS_SOURCES: [
    './partials/**/*.scss',
    './source/sass/composite/**/*.scss',
  ],
  SASS_OUT_DIR: './dist/css/composite/'
};

var jsFiles = readdirRecursive(config.JS_SOURCE_DIR);
var entry = {};
jsFiles.forEach(function (value) {
  if (value.endsWith('.js')) {
    var key = value.substring(0, value.length - 3);
    entry[key] = config.JS_SOURCE_DIR + value;
  }
});

gulp.task('compile-js', function() {
  return gulp.src(config.JS_SOURCES)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.JS_OUT_DIR));
});

gulp.task('watch-js', () => {

});

gulp.task('compile-sass', function() {
  gulp.src(config.SASS_SOURCE_DIR)
  .pipe(sass({
    outputStyle: 'compressed'
  })).on('error', sass.logError)
  .pipe(rename(function(path) {
    path.basename += '.min';
  }))
  .pipe(autoprefixer({
    browsers: [
      'last 1 version',
      'last 2 iOS versions'
    ],
  }))
  .pipe(gulp.dest(config.SASS_OUT_DIR));
});

gulp.task('watch-sass', function() {
  gulp.watch(config.SASS_SOURCES, ['compile-sass']);
});

gulp.task('build', ['compile-js', 'compile-sass']);
gulp.task('grow-build', ['compile-js', 'compile-sass']);
gulp.task('default', ['compile-js', 'compile-sass', 'watch-js', 'watch-sass']);
