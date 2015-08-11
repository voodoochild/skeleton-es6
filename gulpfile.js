var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');

gulp.task('clean', function () {
    del.sync(['./dist/*'], { force: true }, function (err, paths) {
        if (err) { return console.error(err); }
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
});

gulp.task('build-html', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(reload({ stream: true }));
});

gulp.task('build-images', function () {
    gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({ stream: true }));
});

gulp.task('build-fonts', function () {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
        .pipe(reload({ stream: true }));
});

gulp.task('build-static', ['build-html', 'build-images', 'build-fonts']);

gulp.task('build-css', function () {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(reload({ stream: true }));
});

gulp.task('build-js', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({ stream: true }));
});

gulp.task('build-all', ['clean', 'build-static', 'build-css', 'build-js']);

gulp.task('serve', ['build-all'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/**/*.html', ['build-html']);
    gulp.watch('src/images/**/*', ['build-images']);
    gulp.watch('src/fonts/**/*', ['build-fonts']);
    gulp.watch('src/styles/**/*.scss', ['build-css']);
    gulp.watch('src/js/**/*.js', ['build-js']);
});

gulp.task('default', ['serve']);
