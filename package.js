Package.describe({
  name: "ground:minimax",
  version: '1.0.1',
  summary: "Adds MiniMax.minify/maxify/parse/stringify making compress and decompress objects",
  git: "https://github.com/GroundMeteor/minimax.git"
});

Package.onUse(function (api) {

  // TODO: remove underscore deps _.each (used once)

  api.versionsFrom('1.0');

  api.use([
    'underscore',
    'ejson'
  ], ['client', 'server']);

  api.use(['ground:dictionary@0.1.2'], ['client', 'server']);

  api.export('MiniMax');

  api.addFiles('ejson.minimax.js', ['client', 'server']);
});

Package.onTest(function (api) {

  api.use('ground:minimax', ['client', 'server']);
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson']);

  api.addFiles('ejson.minimax.tests.js', ['client', 'server']);

});
