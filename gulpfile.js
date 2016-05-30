const gulp = require('gulp');
const jscs = require('gulp-jshint');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', () =>{
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', 
                                './public/js/*.js'], {read:false});

    var injectOptions = {
      ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    }

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], () => {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsFiles
  }

  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting App...');
    })
} )