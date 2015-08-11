var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

function clean () {
    del.sync(['./dist'], { force: true }, function (err, paths) {
        if (err) { return console.error(err); }
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
}

function buildhtml () {
    gulp.src('./src/*.html').pipe(gulp.dest('./dist'));
}

function buildcss () {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/styles'));
}

function buildjs () {
    gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
}

gulp.task('build', function () {
    clean();
    buildhtml();
    buildcss();
    buildjs();
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', buildhtml);
    gulp.watch('src/styles/**/*.css', buildcss);
    gulp.watch('src/js/**/*.js', buildjs);
});

gulp.task('clean', function () { clean(); });
gulp.task('default', ['watch']);
