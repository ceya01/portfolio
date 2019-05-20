import gulp from 'gulp';
import webpackConfig from './webpack.config';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';

//gulpタスクの作成
gulp.task('build',function(done){
    gulp.src('src/js/app.js')
        .pipe(plumber({
            errorHandler:notify.onError("Error: <%= error.message %>")
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/js/'));
    done();
});
gulp.task('browser-sync',function (done) {
    browserSync.init({
        server:{
            baseDir: "./",      //対象ディレクトリ
            index:"index.html"  //indexファイル名
        }
    });
    done();
});
gulp.task('bs-reload',function(done){
    browserSync.reload();
    done();
});
gulp.task('eslint',function(done){
    return gulp.src(['src/js/*.js'])    //lintのチェック先を指定
        .pipe(plumber({
            errorHandler: function(error){
                const taskName ='eslint';
                const title = '[task]' + taskName + ' ' + error.plugin;
                const errorMsg = 'error: ' + error.message;
                //ターミナルにエラーを出力
                console.error(title +'\n'+errorMsg);
                //エラー通知
                notify.onError({
                    title:title,
                    message: errorMsg,
                    time:3000
                });
            }
        }))
        .pipe(eslint({ useEslintrc: true }))    // .eslintrc
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(plumber.stop());
});
gulp.task('build-sass',function(done){
    gulp.src('src/sass/style.scss')
        .pipe(plumber({
            errorHandler:notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('dist/css/'));
    done();
});

//Gulpを使ったファイルの監視
gulp.task('default', gulp.series('eslint','build','build-sass','browser-sync',
function(done){
    gulp.watch('./src/js/*.js',gulp.task('build'));
    gulp.watch('./src/sass/**/*.scss',gulp.task('build-sass'));
    gulp.watch('./*.html',gulp.task('bs-reload')); 
    gulp.watch('./dist/**/*.+(js|css)',gulp.task('bs-reload'));
    gulp.watch('./src/**/*.js',gulp.task('eslint'));
    done();
}));