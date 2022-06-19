import pkg from 'gulp';
import minifyHtml from 'gulp-minify-html';
import cleanCss from 'gulp-clean-css';
import concatCss from 'gulp-concat-css';
import rename from 'gulp-rename';
import gulpConcat from 'gulp-concat';
import gulpUglify from 'gulp-uglify';
import imagemin from 'gulp-image';
import gulpttf2woff from 'gulp-ttf2woff';
import del from 'del';
import { readFileSync, writeFileSync } from 'fs';

const nameCSS = getRandomKey();
// const nameJS = getRandomKey();
const cssOptions = { path: './build/html/index.html', pattern: '{style}', insert: `/css/${ nameCSS }.min.css` };
// const jsOptions = { path: './build/html/index.html', pattern: '{javascript}', insert: `/javascript/${ nameJS }.min.mjs` };

const { series, parallel, src, dest, watch } = pkg;
const srcFiles = {
  html: './src/html/**/*.html',
  css: './src/css/style.css',
  normalize: './src/css/normalize.css',
  404: './src/css/404.css',
  img: './src/images/**/*.*',
  fonts: './src/fonts/*.ttf'
};

const destFiles = {
  html: './build/html/',
  css: './build/css/',
  js: './build/js/',
  img: './build/images/',
  fonts: './build/fonts/'
}

const jsFiles = [
  './src/js/helper.mjs',
  './src/js/menu.mjs',
  './src/js/pages.mjs',
  './src/js/portionWords.mjs',
  './src/js/card.mjs',
  './src/js/topButtons.mjs',
  './src/js/tableSettings.mjs',
  './src/js/main.mjs',
];

function cleanFolder() {
  return del('./build');
}

function compressHtml() {
  return src(srcFiles.html)
    .pipe(minifyHtml())
    .pipe(dest(destFiles.html));
}

function compressCss() {
  return src(srcFiles.css)
  .pipe(concatCss('style.css'))
  .pipe(cleanCss())
  .pipe(rename({
    basename: nameCSS,
    extname: '.min.css'
  }))
  .pipe(dest(destFiles.css));
}

function compress404() {
  return src(srcFiles[404])
  .pipe(cleanCss())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(dest(destFiles.css));
}

function compressNormalize() {
  return src(srcFiles.normalize)
  .pipe(cleanCss())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(dest(destFiles.css));
}

function compressImage() {
  return src(srcFiles.img)
  .pipe(imagemin())
  .pipe(dest(destFiles.img));
}

function cobvertFonts() {
  return src(srcFiles.fonts)
  .pipe(gulpttf2woff())
  .pipe(dest(destFiles.fonts));
}

function compressJS() {
  return src(jsFiles)
  .pipe(gulpConcat('script.mjs'))
  .pipe(gulpUglify())
  .pipe(
    rename({
      extname: '.min.mjs'
    })
  )
  .pipe(dest(destFiles.js));
}

function getRandomKey() {
  let key = '';
  const lettersLowCase = 'abcdefghijklmnopqrstuvwxyz';
  const lettersUpperCase = lettersLowCase.toUpperCase();
  const digits = '0123456789';

  const keyString = lettersLowCase + lettersUpperCase + digits;
  const lengthKeyString = keyString.length; 

  while(key.length < 8) {
    key = key + keyString[getRandomInt(0, lengthKeyString)];
  }

  return key;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function replaceText(options, cb) {
  const { path, pattern, insert } = options;
  const properties = { encoding: 'utf-8' };
  const page = readFileSync(path, properties);
  const update = page.replace(pattern, insert);
  writeFileSync(path, update, properties);
  cb(null, 'done');
}

export default series(
  cleanFolder,
  compressHtml,
  parallel(compressCss, compress404, compressNormalize),
  compressJS,
  compressImage,
  cobvertFonts,
  replaceText.bind(replaceText, cssOptions)
);