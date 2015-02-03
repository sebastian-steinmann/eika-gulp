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
    return gulp.src(basePath + paths.templates + "/**/*.ascx")
        .pipe(changed(prodPath + paths.templates))
        .pipe(gulp.dest(prodPath + paths.templates))
})

gulp.task('js', function() {
    return gulp.src(basePath + paths.js + '/**/*.js')
        .pipe(changed(prodPath + paths.js))
        .pipe(gulp.dest(prodPath + paths.js))
});

gulp.task('sass', function () {
    return gulp.src(basePath + paths.sass + '/*.scss')
        .pipe(sass({
            style: 'compressed',
            sourcemap: false,
            container: "gulp-ruby-sass-production",
            cacheLocation: ".sass-cache"
        }))
        .pipe(gulp.dest(basePath + paths.css))
});

gulp.task('sass-dev', function () {
    return gulp.src(basePath + paths.sass + '/mainGreen.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            cacheLocation: ".sass-cache2"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(prodPath + paths.css));
});

gulp.task('startWatch', function () {
    gulp.watch(basePath + paths.sass + '/**/*.scss', ['sass-dev', 'sass']);
    gulp.watch(basePath + paths.js + '/**/*.js', ['js']);
    gulp.watch(basePath + paths.templates + '/**/*.ascx', ['templates']);
});

gulp.task('watch', ['js', 'sass', 'sass-dev', 'templates', 'startWatch']);

gulp.task('default', ['sass']);