var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');

var basePath = "../digitale-kundeflater/src/main/projects/Eika.DKF.Web.Portal";
var prodPath = "../../websites/terra.eikadev.no/Website";

var paths = {
    sass: '/Content/Styles/scss',
    css: '/Content/Styles/css',
    js:  "/Scripts",
    templates: "/Presentations"
};

gulp.task("templates", function() {
    gulp.src(basePath + paths.templates + "/**/*.ascx")
        .pipe(changed(prodPath + paths.templates))
        .pipe(gulp.dest(prodPath + paths.templates))
})

gulp.task('js', function() {
    gulp.src(basePath + paths.js + '/**/*.js')
        .pipe(changed(prodPath + paths.js))
        .pipe(gulp.dest(prodPath + paths.js))
});

gulp.task('sass', function () {
    gulp.src(basePath + paths.sass + '/*.scss')
        .pipe(sass({
            style: 'compressed',
            sourcemap: false
        }))
        .pipe(gulp.dest(basePath + paths.css))
});

gulp.task('sass-dev', function () {
    gulp.src(basePath + paths.sass + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourcemapPath: "",
            sourcemap: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(prodPath + paths.css));
});

gulp.task('startWatch', function () {
    gulp.watch(basePath + paths.sass + '/**/*.scss', ['sass', 'sass-dev']);
    gulp.watch(basePath + paths.js + '/**/*.js', ['js']);
    gulp.watch(basePath + paths.templates + '/**/*.ascx', ['templates']);
});

gulp.task('watch', ['js', 'sass', 'sass-dev', 'templates', 'startWatch']);

gulp.task('default', ['sass']);