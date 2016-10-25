var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    angularProtractor = require('gulp-angular-protractor');

// optimize images
gulp.task('images', function() {
    return gulp.src('./images/**/*')
        .pipe($.changed('./build/images'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./build/images'));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// minify JS
gulp.task('minify-js', function() {
    gulp.src('js/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./build/'));
});

// minify CSS
gulp.task('minify-css', function() {
    gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.minifyCss({
            keepBreaks: true
        }))
        .pipe(gulp.dest('./styles/'))
        .pipe(gulp.dest('./build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
    var opts = {
        comments: true,
        spare: true,
        conditionals: true
    };

    gulp.src('./*.html')
        .pipe($.minifyHtml(opts))
        .pipe(gulp.dest('./build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
    gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
        .pipe($.changed('./build/fonts'))
        .pipe(gulp.dest('./build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
    return browserSync({
        server: {
            baseDir: './'
        }
    }, done);
});


// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
    return gulp.src('styles/style.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            style: 'expanded'
        }))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error: <%= error.message %>'
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('styles'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Styles task complete'
        }));
});

// Setting up the test task
gulp.task('protractor', function(callback) {
    gulp
    gulp.src(['./src/protractor/'])
        .pipe(angularProtractor({
            'configFile': 'protractor/conf.js',
            'args': ['--baseUrl', 'http://127.0.0.1:8000'],
            'autoStartStopServer': true,
            'debug': false
        }))
        .on('error', function(e) {
            throw e;
            console.log('hello');
        })
});

// reload all Browsers
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'sass', 'minify-css', ], function() {
    gulp.watch('styles/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['*.html', 'views/*.html'], ['bs-reload']);
    gulp.watch(['app/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
    gulp.watch('styles/**/*.scss', ['sass', 'minify-css']);
});

gulp.task('test', function(callback) {
    runSequence(
        'browser-sync',
        'protractor',
        callback);
});
