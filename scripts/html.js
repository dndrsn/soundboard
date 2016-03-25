var shell = require('shelljs');
var nunjucks = require('nunjucks');
var fs = require('fs');
var commandLineArgs = require('command-line-args');
var glob = require('glob');
var watch = require('watch');

var config = {
  source: 'src/html/pages/',
  dest: 'pub/',
};

nunjucks.configure('.', {
  trimBlocks: true,
  noCache: true,
});

function log(text) {
  console.log("-- HTML: " + text);
}


function buildFile(f) {
  log("building - " + f);
  var html = nunjucks.render(f);
  var destFile = f.replace(new RegExp('^' + config.source), config.dest).replace(/\.njk$/, '.html');
  fs.writeFileSync(destFile, html);
  log("generated - " + destFile);
}


function buildSrc() {
  log("building HTML");
  shell.mkdir('-p', config.dest);
  glob(config.source + '**/*.njk', function(err, files) {
    files.forEach(function(f){
      buildFile(f);
    });
  });
}


function watchSrc() {
  log("watching HTML");
  var filter = function(f) {
    return !!(f.match(/\.njk$/));
  };
  watch.watchTree(config.source, { filter: filter }, function (f, curr, prev) {
    if(typeof f === "string") {
      buildFile(f);
    }
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
