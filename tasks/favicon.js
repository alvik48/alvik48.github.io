'use strict';

const gulp = require('gulp');
const resize = require('gulp-image-resize');
const rename = require('gulp-rename');

const CONFIG = {
  SRC: './docs/favicon-192.png',
  DEST: './docs',
  SIZES: [62, 48, 32, 16, 152, 120, 76, 60, 'ico']
};

/* ==============================================
    Copy
============================================== */

gulp.task('favicon', (callback) => {
  Promise.all(CONFIG.SIZES.map((size) => new Promise((resolve, reject) => {
    gulp.src(CONFIG.SRC)

    // Resize icon
    .pipe(resize({
      width: size === 'ico' ? 16 : size,
      height: size === 'ico' ? 16 : size,
      imageMagick: true,
      format: size === 'ico' ? 'ico' : 'png'
    }))

    // Set name
    .pipe(rename({
      basename: size === 'ico' ? 'favicon' : 'favicon-' + size
    }))

    // Move to destination
    .pipe(gulp.dest(CONFIG.DEST))

    // Resolve promise on task end
    .on('end', () => {
      return resolve();
    })
  }))).then(() => callback());
});
