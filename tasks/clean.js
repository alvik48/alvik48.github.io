'use strict';

const gulp = require('gulp');
const del = require('del');

const CONFIG = {
  SRC: './docs'
}

/* ==============================================
    Clean
============================================== */

gulp.task('clean', () => {
  return del(CONFIG.SRC);
});
