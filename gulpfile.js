var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('js', function() {
	gulp.src('./dashboard/app.js')
		.pipe(browserify())
		.pipe(gulp.dest('./static'));
});

gulp.task('default', ['js']);
