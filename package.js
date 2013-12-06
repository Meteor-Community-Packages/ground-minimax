Package.describe({
  summary: "Adds EJSON.minify and EJSON.maxify");

Package.on_use(function (api) {
  // TODO: remove underscore deps _.each (used once)
  api.use(['underscore', 'ejson'], ['client', 'server']);
  api.imply('ejson');

  api.add_files('ejson.minimax.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('ejson-minimax', ['client', 'server']);
  api.use('test-helpers', 'client');
  api.use(['tinytest', 'underscore', 'ejson']);

  api.add_files('ejson.minimax.tests.js', ['client', 'server']);

});
