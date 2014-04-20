var gulp = require('gulp');
var browserify = require('gulp-browserify');
var dotify = require('gulp-dotify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var config = {
	staticPath: './static',
	jsApp: ['./dashboard/app.js'],
	css: ['./dashboard/styles/main.css', './vendor/Metro-UI-CSS/css/metro-bootstrap.css'],
	distCss: 'main.css'
};

gulp.task('js', function() {
	gulp.src(config.jsApp)
		.pipe(plumber())
		.pipe(browserify())
		.pipe(gulp.dest(config.staticPath));
});

gulp.task('js-uglify', function() {
	gulp.src(config.jsApp)
		.pipe(plumber())
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest(config.staticPath));
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
	gulp.src(config.css)
		.pipe(concat(config.distCss))
		.pipe(gulp.dest(config.staticPath));
});

gulp.task('css-optimized', function() {
	gulp.src(config.css)
		.pipe(concat(config.distCss))
		.pipe(uncss({
			html: ['./stuff/rendered.html']
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest(config.staticPath));
});

gulp.task('watch', function() {
	gulp.watch('./dashboard/**/*.*', ['templates', 'js']);
});

gulp.task('build', ['templates', 'js-uglify', 'css-optimized']);
gulp.task('default', ['build']);
