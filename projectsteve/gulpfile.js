/**
 * Created by stevenmcdonald on 2/27/17.
 */
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "ng serve"
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

