'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpData = require('gulp-data');
const nunjucks = require('gulp-nunjucks-render');
const inlineSource = require('gulp-inline-source');
const packageData = require('../package.json');

const CONFIG = {
  SRC: './src/html/*.html',
  TMPL: ['./src/html/'],
  DEST: './docs'
};

/* ==============================================
    HTML
============================================== */

gulp.task('html', () => {

  return gulp.src(CONFIG.SRC)

  // Prevent gulp crashing
  .pipe(plumber({
    errorHandler: notify.onError("GULP error in \"html\" task: <%= error.message %>")
  }))

  // Extract and pass down some JSON data
  .pipe(gulpData({
    version: packageData.version
  }))

  // Render nunjucks templates
  .pipe(nunjucks({
    path: CONFIG.TMPL
  }))

  // Inline scripts
  .pipe(inlineSource())

  // Move to destination
  .pipe(gulp.dest(CONFIG.DEST));
});
