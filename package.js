Package.describe({
  name: "raix:minimax",
  version: '0.1.0',
  summary: "Adds MiniMax.minify/maxify/parse/stringify making compress and decompress objects"
});

Package.on_use(function (api) {
  // TODO: remove underscore deps _.each (used once)
  api.use([
    'underscore@1.0.0',
    'ejson@1.0.0'
  ], ['client', 'server']);
  api.use(['raix:dictionary@0.0.0'], ['client', 'server']);
  api.export('MiniMax');

  api.add_files('ejson.minimax.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('raix:minimax', ['client', 'server']);
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson']);

  api.add_files('ejson.minimax.tests.js', ['client', 'server']);

});
