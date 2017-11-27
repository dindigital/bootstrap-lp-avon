const gulp = require('gulp')
    , sass = require('gulp-sass')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , tinypng = require('gulp-tinypng-compress')
    , cleanCSS = require('gulp-clean-css')
    , folderDestiny = './'
    , paths = {
    source: './resources/assets'
};

// SASS
gulp.task('sass', function () {
    gulp.src('./resources/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(folderDestiny + '/assets/css'));
});

gulp.task('scripts-vendor', function () {
    return gulp.src([
    ])
        .pipe(concat('vendor.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(folderDestiny + '/assets/js'));
});

gulp.task('scripts', function () {
    return gulp.src([
        paths.source + '/js/app.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(folderDestiny + '/assets/js'));
});

// WATCH SASS E JS
gulp.task('watch', function () {
    gulp.watch('./resources/assets/scss/**/*.scss', ['sass']);
    gulp.watch('./resources/assets/js/**/*.js', ['scripts']);
});

// TINY PNG - compactando imagens
gulp.task('tiny', function () {
    gulp.src('images/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'e-LFigXOJXuxlObKAsukPhYwjvwbRQBu',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('./assets/img'));
});

gulp.task('default', ['sass', 'scripts', 'scripts-vendor']);
