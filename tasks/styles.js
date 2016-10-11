'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const minify = require('gulp-cssnano');
const rev = require('gulp-rev');
const server = require('./server');

const CONFIG = {
  SRC: './src/styles/app.styl',
  DEST: './docs/styles',
  STYLUS: {
    url: {
      name: 'url',
      paths: ['src/images/inline']
    }
  },
  AUTOPREFIXER: ['Explorer > 8']
};

/* ==============================================
    Styles
============================================== */

gulp.task('styles', () => {
  return gulp.src(CONFIG.SRC)

  // Prevent gulp crashing
  .pipe(plumber({
    errorHandler: notify.onError("GULP error in \"styles\" task: <%= error.message %>")
  }))

  // Init sourcemaps in development mode
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init({
    loadMaps: true
  }))

  // Compile main stylus file
  .pipe(stylus(CONFIG.STYLUS))

  // Add vendor prefixes
  .pipe(autoprefixer(CONFIG.AUTOPREFIXER))

  // Minify CSS in production mode
  .pipe(gutil.env.production ? minify() : gutil.noop())

  // Write sourcemaps in development mode
  .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('./'))

  // Add revision
  // .pipe(rev())

  // Move to destination
  .pipe(gulp.dest(CONFIG.DEST))

  // Reload server
  .pipe(gutil.env.production ? gutil.noop() : server.stream({
    match: '**/*.css'
  }));
});
