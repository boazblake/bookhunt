const gulp = require('gulp');
const jshint = require('gulp-jshint');

const jsFiles = ['8.js', 'src/**/*.js'];

gulp.task('style', ()=>{
	gulp.src(jsFiles)
		.pipe(jshint())
});