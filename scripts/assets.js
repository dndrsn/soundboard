var shell = require('shelljs');
var _watch = require('watch');


function log(text) {
  console.log("-- Assets: " + text);
}


function build(srcDirs, pubDir) {
  srcDirs.forEach(function(srcDir) {
    log('copying ' + srcDir);
    shell.cp('-rf', srcDir, pubDir);
    log('copied ' + srcDir);
  });
}


function watch(srcDirs, pubDir) {
  log("watching Assets");
  srcDirs.forEach(function(dir){
    log("watching - " + dir);
    _watch.watchTree(dir, function (f, curr, prev) {
      if(typeof f === "string") {
        log("file changed - " + f);
        var destFile = f.replace(/^src\//, pubDir);
        shell.cp('-f', f, destFile);
        log("file copied - " + destFile);
      }
    });
  });
}



module.exports = {
  build: build,
  watch: watch,
};


