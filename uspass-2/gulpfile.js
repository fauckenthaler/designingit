var gulp = require('gulp');

var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var imagemin = require('gulp-imagemin');
var sourcemap = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var sequence = require('gulp-sequence');

var path = {
  dist: {
    html: 'dist',
    styles: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
    fonts: 'dist/fonts/'
  },
  app: {
    html: 'app/*.html',
    styles: 'app/scss/**/*.scss',
    js: 'app/js/**/*.js',
    img: 'app/img/**/*.*',
    fonts: 'app/fonts/**/*.*'
  }
};

gulp.task('html', function () {
  return gulp.src(path.app.html)
    .pipe(changed(path.dist.html))
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('fonts', function () {
  return gulp.src(path.app.fonts)
    .pipe(changed(path.dist.fonts))
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('js', function () {
  return gulp.src(path.app.js)
    .pipe(changed(path.dist.js))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('styles', function () {
  return gulp.src(path.app.styles)
    .pipe(sourcemap.init())
    .pipe(prefix({
      browsers: ['last 3 version', '>1%']
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemap.write())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src(path.app.img)
    .pipe(changed(path.dist.img))
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img));
});

gulp.task('clean', function () {
  del('dist');
});

gulp.task('server', function () {
  browserSync.init({
    server: 'dist'
  });

  gulp.watch('dist/**/*.{js,html}').on('change', browserSync.reload);
});

gulp.task('build', sequence(['html', 'styles', 'js', 'fonts', 'images']));

gulp.task('watch', function () {
  gulp.watch(path.app.html, ['html']);
  gulp.watch(path.app.styles, ['styles']);
  gulp.watch(path.app.js, ['js']);
  gulp.watch(path.app.fonts, ['fonts']);
  gulp.watch(path.app.img, ['images']);
});

gulp.task('default', sequence('build', ['server', 'watch']));