var nunjucks = require('nunjucks');
var fs = require('fs');
var glob = require('glob');
var _watch = require('watch');



nunjucks.configure('.', {
  trimBlocks: true,
  noCache: true,
});


function log(text) {
  console.log("-- HTML: " + text);
}


function getContext(env) {
  var context = {
    env: env,
  };
  return context;
}


function buildFile(f, context, srcDir, pubDir) {
  log("building - " + f);
  context = context || {};
  var html = nunjucks.render(f, context);
  var destFile = f.replace(new RegExp('^' + srcDir), pubDir).replace(/\.njk$/, '.html');
  fs.writeFileSync(destFile, html);
  log("generated - " + destFile);
}


function build(srcDir, pubDir, env) {
  log("building HTML");
  var context = getContext(env);
  glob(srcDir + '**/*.njk', function(err, files) {
    files.forEach(function(f){
      buildFile(f, context, srcDir, pubDir);
    });
  });
}


function watch(srcDir, pubDir) {
  log("watching HTML");
  var filter = function(f) {
    return !!(f.match(/\.njk$/));
  };
  _watch.watchTree(srcDir, { filter: filter }, function (f, curr, prev) {
    if(typeof f === "string") {
      buildFile(f, srcDir, pubDir);
    }
  });
}


module.exports = {
  build: build,
  watch: watch,
};

