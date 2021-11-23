const { src, dest, watch, parallel, series } = require('gulp');

const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

function bSync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
	});
}

function images() {
	return src('app/images/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			]),
		)
		.pipe(dest('dist/images'));
}

function scripts() {
	return src(['node_modules/jquery/dist/jquery.js', 'app/js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
}

function styles() {
	return src('app/stylus/style.styl')
		.pipe(stylus({ compress: true }))
		.pipe(concat('style.min.css'))
		.pipe(
			autoPrefixer({
				overrideBrowserslist: ['last 10 version'],
				grid: true,
			}),
		)
		.pipe(dest('app/css'))
		.pipe(browserSync.stream());
}

function clearDist() {
	return del('dist');
}

function build() {
	return src(['app/css/style.min.css', 'app/fonts/**/*', 'app/js/main.min.js', 'app/*.html'], { base: 'app' }).pipe(
		dest('dist'),
	);
}

function watching() {
	watch(['app/stylus/**/*.styl'], styles);
	watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.default = parallel(styles, scripts, bSync, watching);
exports.build = series(clearDist, images, build);
