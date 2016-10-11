'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const CONFIG = {
  SRC: './src/js/app.js',
  DEST: './docs/js'
};

/* ==============================================
    JS
============================================== */

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')

  // Prevent gulp crashing
  .pipe(plumber({
    errorHandler: notify.onError("GULP error in \"js\" task: <%= error.message %>")
  }))

  // Init sourcemaps in development mode
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init({
    loadMaps: true
  }))

  .pipe(rollup({
    entry: './src/js/app.js'
  }))

  // Transform via babel
  .pipe(babel({
    presets: ['es2015']
  }))

  // Uglify result file in production mode
  .pipe(gutil.env.production ? uglify() : gutil.noop())

  // Write sourcemaps in development mode
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('./'))

  // Move to destination
  .pipe(gulp.dest(CONFIG.DEST));
});
