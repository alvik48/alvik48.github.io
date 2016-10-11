'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const server = require('browser-sync').create();
const chokidar = require('chokidar');

const CONFIG = {
  BASE: './docs',
  WATCH: [{
    paths: './src/static/**/*',
    tasks: ['static-watch']
  }, {
    paths: './src/html/**/*',
    tasks: ['html-watch']
  }, {
    paths: './src/js/**/*',
    tasks: ['js-watch']
  }, {
    paths: ['./src/styles/**/*', './src/images/inline/**/*'],
    tasks: ['styles']
  }, {
    paths: ['./src/images/**/*', '!./src/images/sprite/**/*', '!./src/images/inline/**/*'],
    tasks: ['images-watch']
  }, {
    paths: './src/images/sprite/**/*',
    tasks: ['sprite-watch']
  }]
};

/* ==============================================
    Server
============================================== */

gulp.task('server', () => {
  // Don't start static server in production mode
  if (gutil.env.production) {
    return false;
  }

  // Start server
  server.init({
    server: {
      baseDir: CONFIG.BASE
    },
    notify: false,
    minify: false
  });

  // Enable watchers
  for (let w = 0, wlen = CONFIG.WATCH.length; w < wlen; ++w) {
    watch(CONFIG.WATCH[w].paths, CONFIG.WATCH[w].tasks);
  }
});

/* ==============================================
    Watchers
============================================== */

gulp.task('html-watch', ['html'], (done) => {
  server.reload();
  done();
});

gulp.task('static-watch', ['copy'], (done) => {
  server.reload();
  done();
});

gulp.task('js-watch', ['js'], (done) => {
  server.reload();
  done();
});

gulp.task('images-watch', ['images'], (done) => {
  server.reload();
  done();
});

gulp.task('sprite-watch', ['sprite'], (done) => {
  gulp.start('images-watch');
  gulp.start('styles');
  done();
});

/* ==============================================
    Watching
============================================== */

function watch(src, tasks) {
  chokidar.watch(src, {
    persistent: true
  }).on('all', (event, path) => {
    watchLog(event, path);
    gulp.start(tasks);
  });
}

function watchLog(event, path) {
  gutil.log('File: ' + gutil.colors.green.bold(path) + ' Event: ' + gutil.colors.green.bold(event));
}

/* ==============================================
    
============================================== */

module.exports = server;
