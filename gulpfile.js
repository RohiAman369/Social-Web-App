const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');



gulp.task('sass', function () {
    return gulp.src('./Assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./Assets/css'));
})

gulp.task('watch', function () {
    return gulp.watch('./Assets/scss/**/*.scss', gulp.series('sass'));
})

gulp.task('nodemon', gulp.parallel('watch', function () {
    return nodemon({
        script: 'index.js',
        watch:'./'
    })
        .on('restart', function () {
            console.log('restarted');
        })
}
));
gulp.task('serve', gulp.series('nodemon', function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch('./Assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./views/**/*.ejs').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));










