'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const tinypng = require('gulp-tinypng');
const sprite = require('gulp.spritesmith');

const CONFIG = {
  SRC: ['./src/images/**/*', '!./src/images/sprite/**/*', '!./src/images/inline/**/*'],
  DEST: './docs/images',
  SPRITE: {
    SRC: './src/images/sprite/**/*',
    IMG_DEST: './src/images',
    CSS_DEST: './src/styles/common',
    OPTS: {
      imgName: 'elements.png',
      cssName: 'sprite.styl',
      imgPath: './../images/elements.png',
      padding: 2
    }
  }
};

/* ==============================================
    Images
============================================== */

gulp.task('images', () => {
  return gulp.src(CONFIG.SRC)

  // Optimize images in production mode
  .pipe(gutil.env.production ? imagemin({
    progressive: true
  }) : gutil.noop())

  // Optimize png in production mode
  // .pipe(gutil.env.production ? tinypng() : gutil.noop())

  // Move to destination
  .pipe(gulp.dest(CONFIG.DEST));
});

/* ==============================================
    Sprite
============================================== */

gulp.task('sprite', () => {

  // Create sprite image & stylus file
  const spriteData = gulp.src(CONFIG.SPRITE.SRC)
    .pipe(sprite(CONFIG.SPRITE.OPTS));

  // Move sprite image to destination
  spriteData.img
    .pipe(gulp.dest(CONFIG.SPRITE.IMG_DEST));

  // Move sprite style to destination
  spriteData.css
    .pipe(gulp.dest(CONFIG.SPRITE.CSS_DEST));

  return spriteData;
});
