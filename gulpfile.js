const {
  src,
  dest,
  parallel,
  watch
} = require('gulp'); //导入gulp
//导入其他插件
const less = require("gulp-less"); //引入编译
const cleanCss = require("gulp-clean-css"); //引入压缩
const rename = require("gulp-rename"); //引入重命名
const uglify = require("gulp-uglify"); //引入压缩js
const browserSync = require("browser-sync").create(); //启用服务器插件
const reload = browserSync.reload; //热加载

//编译less
function css() {
  return src("./less/*.less") //要处理的文件源
    .pipe(less()) //编译 less==>css
    .pipe(cleanCss()) //压缩css
    .pipe(rename({
      suffix: ".min"
    })) //重命名
    .pipe(dest("./dist/css")) //输出
    .pipe(reload({ //热加载
      stream: true
    }))
}
//压缩js
function js() {
  return src("./js/*.js") //要处理的源文件
    .pipe(uglify()) //压缩
    .pipe(
      rename({
        suffix: ".min"
      })
    ) //重命名
    .pipe(dest("./dist/js")) // 输出
    .pipe(reload({ //热加载
      stream: true
    }))
}
//启动服务的任务
function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3033
  });
}
//上帝之眼(观察者模式)
function auto() {
  watch("./less/*.less", css); //css
  watch("./js/*.js", js); //js
  watch("**/*.html").on("change", reload) //html
}

//暴露任务
// exports.css = css;
// exports.js = js;
exports.default = parallel(serve, css, js, auto); //默认  gulp

/*
  端口号:
      FTP:21
      HTTP:80
      HTTPS:443
      MySQL:3306
*/