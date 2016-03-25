var shell = require('shelljs');
var fs = require('fs');
var commandLineArgs = require('command-line-args');
var watch = require('watch');

var config = {
  source: ['src/css', 'src/img', 'src/js', 'src/media'],
  dest: 'pub/',
};


function log(text) {
  console.log("-- Assets: " + text);
}


function buildSrc() {
  shell.mkdir('-p', config.dest);
  config.source.forEach(function(srcDir) {
    log('copying ' + srcDir);
    shell.cp('-rf', srcDir, config.dest);
    log('copied ' + srcDir);
  });
}


function watchSrc() {
  log("watching Assets");
  config.source.forEach(function(dir){
    log("watching - " + dir);
    watch.watchTree(dir, function (f, curr, prev) {
      if(typeof f === "string") {
        log("file changed - " + f);
        var destFile = f.replace(/^src\//, config.dest);
        shell.cp('-f', f, destFile);
        log("file copied - " + destFile);
      }
    });
  });
}


function main() {
  var options = commandLineArgs([
    { name: 'watch', alias: 'w', type: Boolean },
  ]).parse();
  if(options.watch) watchSrc();
  else buildSrc();
}


main();
