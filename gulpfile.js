'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const requireDir = require('require-dir');
const gutil = require('gulp-util');

// Require tasks
requireDir('./tasks', {
  recurse: true
});

// Default task
gulp.task('default', function() {
  return runSequence(
    'clean', [
      'html',
      'images',
      'sprite',
      'js',
      'styles',
      'copy'
    ],
    'favicon',
    'server'
  );
});
