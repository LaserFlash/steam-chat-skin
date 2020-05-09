var mkdirp = require("mkdirp");
var fs = require("fs");
var getDirName = require("path").dirname;
var CleanCSS = require("clean-css");
var dir = "./dist/";

var filesToMinify = [
  {
    fileOrPath: "./src/baseTheme.dev.css",
    output: dir + "baseTheme.css"
  },
  {
    fileOrPath: "./src/css/customisable",
    output: dir + "css/customisable"
  }
];

const setup = () => {
  // start with a clean slate
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true });
  }
};

const cssFinder = (path, outputPath, first) => {
  if (fs.statSync(path).isFile()) {
    if (path.endsWith(".css")) {
      // minify css
      minifyCSS(loadFile(path), path, outputPath);
    }
    return;
  }

  // asume directory
  fs.readdirSync(path).forEach(fileOrDirectory => {
    cssFinder(path + "/" + fileOrDirectory, outputPath + "/" + fileOrDirectory);
  });
};

const loadFile = path =>
  fs
    .readFileSync(path)
    .toString()
    .replace(/css\//g, "src/css/");

const minifyCSS = (loadedFile, path, outputPath) =>
  new CleanCSS({ level: { 2: { all: true } }, returnPromise: true })
    .minify(loadedFile)
    .then(output => {
      // create directory if required
      mkdirp(getDirName(outputPath), function(err) {
        if (err) return cb(err);
        fs.writeFileSync(outputPath, output.styles);
      });
    })
    .catch(error => {
      console.log(error);
    });

/* The script*/
setup();
filesToMinify.forEach(file => {
  cssFinder(file.fileOrPath, file.output, true);
});
