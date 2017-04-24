var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var clean = require('gulp-clean')
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sysBuilder = require('systemjs-builder');
var tsc = require('gulp-typescript');
var runSeq = require('run-sequence');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('src/less/grayscale.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('src/css/grayscale.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('src/js/custom.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('out'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('src/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('src/vendor/jquery'))

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('src/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});


// bundle shims
gulp.task('bundle-shims', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js'
      ])
        .pipe(concat('bundle-shims.js'))
        .pipe(uglify())
        .pipe(gulp.dest('out'));
});

// bundle dependencies in systemjs and custom app
gulp.task('bundle-js', function() {
  var builder = new sysBuilder('./', './src/systemjs.config.js');
  builder.buildStatic('./src/main.js', './out/app.min.js', {sourceMaps: true, minify: true});
        
        gulp.src('src/js/custom.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('out/js'))
});

gulp.task('copy-html', function() {
  gulp.src('./src/app/**/*.html', {base: './src'})
  .pipe(gulp.dest('./out'));
  gulp.src('./donotdelete/index.html', {base: './donotdelete'})
  .pipe(gulp.dest('./out'));
});

gulp.task('copy-img', function() {
  gulp.src('./src/img/**', {base: './src'})
  .pipe(gulp.dest('./out'));
});

gulp.task('copy-css', function() {
   gulp.src('./src/css/grayscale.css', {base: './src'})
  .pipe(gulp.dest('./out'));

   gulp.src('./src/vendor/bootstrap/css/bootstrap.min.css', {base: './src/vendor/bootstrap'})
  .pipe(gulp.dest('./out'));

   gulp.src('./src/vendor/bootstrap/fonts/*', {base: './src/vendor/bootstrap'})
  .pipe(gulp.dest('./out'));

   gulp.src('./src/vendor/font-awesome/css/font-awesome.min.css', {base: './src/vendor/font-awesome'})
  .pipe(gulp.dest('./out'));

   gulp.src('./src/vendor/font-awesome/fonts/**', {base: './src/vendor/font-awesome'})
  .pipe(gulp.dest('./out'));
});

gulp.task('clean-out', function (cb) {
    return gulp.src('./out', {read: false})
    .pipe(clean());

});

gulp.task('bundleCssCopy',['bundle-js', 'bundle-shims', 'copy-html', 'copy-img', 'copy-css']);

gulp.task('production', function(){
  return runSeq('clean-out', ['bundleCssCopy']);
});
