var commandLineArgs = require('command-line-args');
var shell = require('shelljs');
var rimraf = require('rimraf');
var html = require('./html');
var assets = require('./assets');

var config = {};
config.srcDir = 'src/';
config.pubDir = 'pub/';
config.pagesDir = config.srcDir + 'html/pages/';
config.assetDirs =  [
  config.srcDir + 'css',
  config.srcDir + 'img',
  config.srcDir + 'js',
  config.srcDir + 'media'
];



function clean() {
  shell.mkdir('-p', config.pubDir);
  rimraf(config.pubDir + '*', {}, function() {
    console.log("-- Clean: cleaned pub dir - " + config.pubDir);
  });
}


function build(env) {
  console.log("env is: " + env);
  env = env || 'dev';
  shell.mkdir('-p', config.pubDir);
  html.build(config.pagesDir, config.pubDir, env);
  assets.build(config.assetDirs, config.pubDir);
}


function watch(env) {
  html.watch(config.pagesDir, config.pubDir);
  assets.watch(config.assetDirs, config.pubDir);
}


function main() {
  var options = commandLineArgs([
    { name: 'action', type: String, defaultOption: true },
    { name: 'env', alias: 'e', type: String },
  ]).parse();
  switch (options.action) {
    case 'clean':
      clean();
      break;
    case 'build':
      build(options.env);
      break;
    case 'watch':
      watch();
      break;
    default:
      break;
  }
}

// module.exports = {
//   do: main(),
// };

main();
