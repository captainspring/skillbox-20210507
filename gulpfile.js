const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const del = require("del");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/form.js")
    .pipe(terser())
    .pipe(rename("form.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = (done) => {
  return del("build");
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: 'google chrome',
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/scss/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js"), gulp.series(scripts);
  gulp.watch("source/*.html"), gulp.series(html, reload);
}

// Build

const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts
  ),
  gulp.series(
    server,
    watcher
  )
);
