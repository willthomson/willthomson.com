const gulp = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const path = require('path');
const readdirRecursive = require('fs-readdir-recursive');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

let isProduction = false;

const config = {
  JS_SOURCE_DIR: './source/js/composite/',
  JS_SOURCES: [ './partials/**/*.js', './source/js/composite/**/*.js' ],
  JS_OUT_DIR: './dist/js/composite/',
  JS_OPTIONS: {
    uglify: {
      mangle: false,
    },
  },
  SASS_SOURCE_DIR: './source/sass/composite/**/*.scss',
  SASS_SOURCES: [ './partials/**/*.scss', './source/sass/**/*.scss' ],
  SASS_OUT_DIR: './dist/css/composite/',
};

const jsFiles = readdirRecursive(config.JS_SOURCE_DIR);
const entryPaths = {};
jsFiles.forEach((value) => {
  if (value.endsWith('.js')) {
    const fileExtLength = 3;
    const key = value.substring(0, value.length - fileExtLength);
    entryPaths[key] = config.JS_SOURCE_DIR + value;
  }
});

const webpackDevConfig = {
  entry: entryPaths,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, config.JS_OUT_DIR),
    filename: '[name].min.js',
  },
};

const webpackProdConfig = {
  entry: entryPaths,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, config.JS_OUT_DIR),
    filename: '[name].min.js',
  },
};

gulp.task('compile-js', () => {
  let webpackConfig = webpackDevConfig;
  if (isProduction === true) {
    webpackConfig = webpackProdConfig;
  }
  return gulp.src(config.JS_SOURCES)
    .pipe(webpackStream(
      webpackConfig, webpack
    ))
    .pipe(gulp.dest(config.JS_OUT_DIR));
});

gulp.task('watch-js', () => {
  webpackDevConfig.watch = true;

  gulp.src(config.JS_SOURCES)
    .pipe(webpackStream(
      webpackDevConfig, webpack
    ))
    .pipe(gulp.dest(config.JS_OUT_DIR));
});

gulp.task('compile-sass', () => {
  gulp.src(config.SASS_SOURCE_DIR)
    .pipe(sass({
      outputStyle: 'compressed',
    })).on('error', sass.logError)
    .pipe(rename((filePath) => {
      filePath.basename += '.min';
    }))
    .pipe(gulpAutoprefixer({
      browsers: [ 'last 1 version', 'last 2 iOS versions' ],
    }))
    .pipe(gulp.dest(config.SASS_OUT_DIR));
});

gulp.task('watch-sass', () => {
  gulp.watch(config.SASS_SOURCES, [ 'compile-sass' ]);
});

gulp.task('set-production', () => {
  isProduction = true;
});

gulp.task('build', [ 'compile-js', 'compile-sass' ]);
gulp.task('grow-build', [ 'set-production', 'compile-js', 'compile-sass' ]);
gulp.task('default', [ 'build', 'watch-js', 'watch-sass' ]);
