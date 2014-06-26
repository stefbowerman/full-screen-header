var gulp   = require('gulp');
var gutil  = require('gulp-util');
var sass   = require('gulp-sass');
var minCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

var appRoot = '.';

var paths = {
  scripts: appRoot + '/src/scripts/**/*',
  sass: appRoot + '/src/scss/**/*.scss',
  build: appRoot + '/build'
};

// Compile SCSS + Minify output
gulp.task('sass', function(){
  gulp.src(appRoot + '/src/scss/app.scss')
    .pipe(sass())
    .pipe(minCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.reload({stream:true, once:true}));
    // console.log('Finished compiling sass');
});

// Compile coffeescripts, minify and concat with javascripts
gulp.task('scripts', function(){
    gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.reload({stream:true, once:true}));
});

gulp.task('browser-sync', function(){
  browserSync.init(null, {
    server: {
      baseDir: "./"
    }
  });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function(){
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch("*.html", ['bs-reload']);
});