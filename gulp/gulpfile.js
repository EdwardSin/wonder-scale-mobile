let gulp = require('gulp');
let minify = require('gulp-imagemin');

gulp.task('compressImages', function(){
    return gulp.src('../../../images/mobile/**')
    .pipe(minify())
    .pipe(gulp.dest('../assets/images'));
})