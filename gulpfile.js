var gulp = require('gulp');
var browserify = require('gulp-browserify');
var dotify = require('gulp-dotify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var plumber = require('gulp-plumber');

gulp.task('js', function() {
	gulp.src('./dashboard/app.js')
		.pipe(plumber())
		.pipe(browserify())
		.pipe(gulp.dest('./static'));
});

gulp.task('templates', function() {
	gulp.src('./dashboard/templates/**/*.html')
		.pipe(plumber())
		.pipe(dotify({
			root: 'templates'
		}))
		.pipe(concat('templates.js'))
		.pipe(header('var JST = {}; module.exports = JST;'))
		.pipe(gulp.dest('./dashboard'));
})

gulp.task('watch', function() {
	gulp.watch('./dashboard/**/*.*', ['build']);
});

gulp.task('build', ['templates', 'js']);
gulp.task('default', ['build']);
