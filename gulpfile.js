const { src, dest, task, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()

const dirs = {
	src: './src',
	dest: './dist'
}

const html = cb => {
	src(dirs.src + '/*.html')
	.pipe(dest(dirs.dest))
	.pipe(browserSync.reload({stream: true}))
	cb()
}
const css = cb => {
	src(dirs.src + '/scss/*.scss')
	.pipe(sass({outputStyle: "compressed"}))
	.pipe(dest(dirs.dest + '/css'))
	.pipe(browserSync.reload({stream: true}))
	cb()
}

const javascript = cb => {
	src(dirs.src + '/js/*.js')
	.pipe(uglify())
	.pipe(dest(dirs.dest + '/js'))
	.pipe(browserSync.reload({stream: true}))
	cb()
}

const images = cb => {
	src(dirs.src + '/img/*')
	.pipe(dest(dirs.dest + '/img'))
	cb()
}

const server = cb => {
	browserSync.init({
		server: dirs.dest
	})

	watch(dirs.src + '/*.html', html)
	watch(dirs.src + '/scss/*.scss', css)
	watch(dirs.src + '/js/*.js', javascript)
	cb()
}

exports.build = parallel(html, css, javascript, images)
exports.server = server
exports.dev = series(exports.build, exports.server)
exports.default = exports.build
