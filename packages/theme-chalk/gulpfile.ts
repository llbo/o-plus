// 打包样式
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoPrefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import path from "path";
import { series, src, dest } from "gulp";
import {outDir} from '../../build/common/paths'
function compile() {
  const sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, "./src/*.scss"))
    .pipe(sass.sync())
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(dest(path.resolve(outDir, "theme-chalk/css")));
}

function copyfont() {
  return src(path.resolve(__dirname, "./src/fonts/**"))
    .pipe(cleanCss())
    .pipe(dest(path.resolve(outDir, "theme-chalk/fonts")));
}

// 输出到根目录dist下
// function copyfullStyle() {
//   return src(path.resolve(__dirname, "./dist/**")).pipe(
//     dest(path.resolve(__dirname, "../../dist"))
//   );
// }
export default series(compile, copyfont);
