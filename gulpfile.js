var gulp = require('gulp');
var browserify = require('gulp-browserify');
var dotify = require('gulp-dotify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var uncss = require('gulp-uncss');

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

gulp.task('css', function() {
	gulp.src(['./dashboard/styles/main.css', './vendor/Metro-UI-CSS/css/metro-bootstrap.css'])
		.pipe(concat('main.css'))
		.pipe(uncss({
			html: ['./stuff/rendered.html']
		}))
		.pipe(gulp.dest('./static'));
});

gulp.task('watch', function() {
	gulp.watch('./dashboard/**/*.js', ['js']);
	gulp.watch('./dashboard/**/*.css', ['css']);
	gulp.watch('./dashboard/**/*.html', ['templates', 'js']);
});

gulp.task('build', ['templates', 'js', 'css']);
gulp.task('default', ['build']);
