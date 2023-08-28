const {src, dest, watch, parallel, series} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const gulpFileInclude = require('gulp-file-include');



function styles () {
    return src('src/scss/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('dist/css/'));
}

function scripts () {
    return src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js/'));
}

function watching () {
    watch('src/scss/*.scss', series(styles, browserSyncReload))
    watch('src/js/*.js', series(scripts, browserSyncReload))
    watch('src/**/*.html', series(HTMLTask, browserSyncReload));
}

function  browserSyncServer () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
}

function HTMLTask() {
    return src('src/**/*.html')
        .pipe(
            gulpFileInclude({
                prefix: '@@',
                basepath: '@file'
            })
        )
        .pipe(dest('dist/'));
}
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browserSyncServer = browserSyncServer;
exports.HTMLTask = HTMLTask;

exports.default = series(
    HTMLTask,
    styles,
    scripts,
    parallel(browserSyncServer, watching)
);

