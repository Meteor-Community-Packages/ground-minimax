Package.describe({
  name: "ground:minimax",
  version: '0.0.2',
  summary: "Adds MiniMax.minify/maxify/parse/stringify making compress and decompress objects"
});

Package.on_use(function (api) {

  // TODO: remove underscore deps _.each (used once)

  if (api.versionsFrom) {

    api.versionsFrom('METEOR@0.9.1');

    api.use([
      'underscore',
      'ejson'
    ], ['client', 'server']);

    api.use(['ground:dictionary@0.0.1'], ['client', 'server']);

  } else {

    api.use([
      'underscore',
      'ejson'
    ], ['client', 'server']);

    api.use(['dictionary'], ['client', 'server']);

  }

  api.export('MiniMax');

  api.add_files('ejson.minimax.js', ['client', 'server']);
});

Package.on_test(function (api) {

  if (api.versionsFrom) {
    api.use('ground:minimax', ['client', 'server']);
  } else {
    api.use('ejson-minimax', ['client', 'server']);
  }
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson']);

  api.add_files('ejson.minimax.tests.js', ['client', 'server']);

});
