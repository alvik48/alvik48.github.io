'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');

const CONFIG = {
  SRC: './src/static/**/*',
  DEST: './docs'
};

/* ==============================================
    Copy
============================================== */

gulp.task('copy', () => {
  return gulp.src(CONFIG.SRC)

  // Move to destination
  .pipe(gulp.dest(CONFIG.DEST));
});
