# Gulp Build

Simple Gulp assembly for undemanding people.

#### What's inside?

1. browser-sync
2. del
3. gulp
4. gulp-autoprefixer
5. gulp-concat
6. gulp-imagemin
7. gulp-stylus
8. gulp-uglify-es
9. jquery

### What's the output?

1. The style.style file will be compiled into style.min.css and minified.
2. One will be collected from all the js files main.min.js and minified.
3. Images will be compressed.
4. It is possible to assemble a ready-made build for sending... somewhere in the right place.

### How to use it?

After downloading, of course, you must first change the name in `package.json`. Then do `npm i` to install all the
necessary modules. After everything is installed, you can already use `gulp`. Just like that ... write `gulp` in the
terminal. In order to build a project, you need to write `gulp build` and all the necessary files will be in the dist
folder.
