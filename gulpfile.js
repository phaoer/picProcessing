var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    eslint = require('gulp-eslint'),
    connect = require('gulp-connect');

var dev = false;

gulp.task('js', function() {
  (function(){
    var file = gulp.src('src/*.js').pipe(concat('xy_image_optimu.js'))
          .pipe(notify({ message: 'lint javascript' }))
          .pipe(eslint())
          .pipe(eslint.format());
    if(dev){
        return file;
    }else{
      return file.pipe(eslint.failAfterError())
      .pipe(notify({ message: 'uglify javascript' }))
      .pipe(uglify())
    }
  })(dev).pipe(gulp.dest('dist/'))
         .pipe(notify({ message: 'javascript compile complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['dist/*.js'], {read: false})
      .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  dev = false;
  gulp.start('js');
});


gulp.task('watch', function() {
 
  dev = true; 

  connect.server({

      livereload:true,

      port:8088

   });

  gulp.watch('src/*.js', ['js']);

  // livereload.listen();

  gulp.watch(['dist/**','*.html']).on('change', function(event){
      notify({ message: event.path + 'was' + event.type });
  });

});