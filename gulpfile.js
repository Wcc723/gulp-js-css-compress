var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css');

var jslibPath = './js-develop/lib/',
    jsappPath = './js-develop/app/',
    cssPath = './css/'

gulp.task('js', function() { //‘coffee'是排程名稱，可自定
    gulp.src(jslibPath + '/*.js') //單一路徑全部壓縮
        .pipe(plumber())
        .pipe(concat('lib.js')) //合併成一隻
        .pipe(uglify()) //壓縮、醜化
        .pipe(gulp.dest('./js')); //輸出位置

    gulp.src([ //自行輸入先後順序後壓縮
            jsappPath + 'js01.js',
            jsappPath + 'js02.js',
            jsappPath + 'js03.js'
        ])
        .pipe(plumber())
		.pipe(concat('app.js')) //合併成一隻
		.pipe(uglify()) //壓縮、醜化
		.pipe(gulp.dest('./js')); //輸出位置
});

gulp.task('minify-css', function() {
    gulp.src(cssPath + '*.css')
        .pipe(plumber())
        .pipe(concat('app.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./stylesheets/'))
});

gulp.task('watch', function () { 
    gulp.watch('./js-develop/**/*.js', ['js']);
    gulp.watch(cssPath + '*.css', ['minify-css']); //監聽路徑，以及檔案變更後所執行的任務
});

gulp.task('default', ['js','minify-css','watch']);

