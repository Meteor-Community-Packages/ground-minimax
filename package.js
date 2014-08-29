Package.describe({
  name: "ejson-minimax",
  version: '0.0.9',
  summary: "Adds MiniMax.minify/maxify/parse/stringify making compress and decompress objects"
});

Package.on_use(function (api) {
  // TODO: remove underscore deps _.each (used once)
  api.use([
    'underscore',
    'ejson'
  ], ['client', 'server']);
  api.use(['dictionary'], ['client', 'server']);
  api.export('MiniMax');

  api.add_files('ejson.minimax.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('ejson-minimax', ['client', 'server']);
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson']);

  api.add_files('ejson.minimax.tests.js', ['client', 'server']);

});
