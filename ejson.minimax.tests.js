"use strict";

function equals(a, b) {
  return !!(JSON.stringify(a) === JSON.stringify(b));
}


var speedTest = function(name, num, func) {
  var startTime = Date.now();
  for (var i = 0; i < num; i++) {
    func();
  }
  console.log(name + ((Date.now() - startTime))/num + ' ms');
}




Tinytest.add('Minify Maxify - test', function(test) {
  var minResult, maxResult, ejsonResult, savedBytes;

  var testObject = function(text, obj) {
    minResult = MiniMax.stringify(obj);

    maxResult = MiniMax.parse(minResult);

    ejsonResult = EJSON.stringify(obj);

    savedBytes = ejsonResult.length - minResult.length;

    console.log(ejsonResult.length + ' > ' + minResult.length + ' '+ Math.round(savedBytes/ejsonResult.length*100) + "%");

    console.log(maxResult);

    console.log(obj);

    test.isTrue(EJSON.equals(maxResult, obj), text);
  };


  var myJSON = '{"vLAfXEQoH2NNabXxg":{"_id":"vLAfXEQoH2NNabXxg","test":"sdfasfd"},"j8Ycq3xRXdEv9ur6L":{"_id":"j8Ycq3xRXdEv9ur6L","test":"sdfasfdafds"},"2Nbn5sCwTPz4okHmM":{"_id":"2Nbn5sCwTPz4okHmM","test":"sasdfasdf"},"oaKpnn5jSoL7zKvrX":{"_id":"oaKpnn5jSoL7zKvrX","test":"sdfasdfasdfasdfasfd"},"Fs4v4G2ne7mWMXKc9":{"_id":"Fs4v4G2ne7mWMXKc9","test":"sdfassdfasdfasfd"},"Z6aLeFGQBr93ZheSd":{"_id":"Z6aLeFGQBr93ZheSd","test":"sdfassdfasdfasfd"},"7s6RJQb4PcgQiCCRb":{"_id":"7s6RJQb4PcgQiCCRb","test":"sdfassdfasdfasfd"},"Q5JFFTT5EmnFh3tzY":{"_id":"Q5JFFTT5EmnFh3tzY","test":"sdfassdfasdfasfd"},"39CTTezRCEkSGf6Le":{"_id":"39CTTezRCEkSGf6Le","test":"sdfassdfasdfasfd"},"bcYCkPgBhXT35z4kA":{"_id":"bcYCkPgBhXT35z4kA","test":"sdfassdfasdfasfd"},"tR8FY8whuhMnZ2Bxe":{"_id":"tR8FY8whuhMnZ2Bxe","test":"sdfassdfasdfasfd"},"4r2QZRZvEWtHdy5q7":{"_id":"4r2QZRZvEWtHdy5q7","test":"sdfassdfasdfasfd"},"tguqzvrFQXwz2AvHb":{"_id":"tguqzvrFQXwz2AvHb","test":"sdfassdfasdfasfd"},"8HxwbxD7qEEge2Mrx":{"_id":"8HxwbxD7qEEge2Mrx","test":"sdfassdfasdfasfd"},"gWNved592HcgCZmfp":{"_id":"gWNved592HcgCZmfp","test":"sdfassdfasdfasfd"},"Cvwh25TrNJjDDeayN":{"_id":"Cvwh25TrNJjDDeayN","test":"sdfassdfasdfasfd"},"XGSfRdQ6Mse4prtMu":{"_id":"XGSfRdQ6Mse4prtMu","test":"sdfassdfasdfasfd"},"6s8FJegBhE5mFnF5L":{"_id":"6s8FJegBhE5mFnF5L","test":"sdfassdfasdfasfd"},"nv4soZdioGTBL6TCW":{"_id":"nv4soZdioGTBL6TCW","test":"sdfassdfasdfasfd"},"ebYsF5dnBQgz9u7P8":{"_id":"ebYsF5dnBQgz9u7P8","test":"sdfassdfasdfasfd"},"ZZTtjv28kTCy6C8ay":{"_id":"ZZTtjv28kTCy6C8ay","test":"sdfassdfasdfasfd"},"js2ZkmMddvSusmH7f":{"_id":"js2ZkmMddvSusmH7f","test":"sdfassdfasdfasfd"},"c4dyme3fdD4nuTR4t":{"_id":"c4dyme3fdD4nuTR4t","test":"sdfassdfasdfasfd"},"FJjQtcycR7JiECCiP":{"_id":"FJjQtcycR7JiECCiP","test":"sdfassdfasdfasfd"},"GBHam3iwqAe6f6BEn":{"_id":"GBHam3iwqAe6f6BEn","test":"sdfassdfasdfasfd"},"dJaqSTworxZq6X8PQ":{"_id":"dJaqSTworxZq6X8PQ","test":"sdfassdfasdfasfd"},"FfG2GDDc9nv9q2B2X":{"_id":"FfG2GDDc9nv9q2B2X","test":"sdfassdfasdfasfd"},"J9cktf2Rd6yywLYoy":{"_id":"J9cktf2Rd6yywLYoy","test":"sdfassdfasdfasfd"},"PxGPYKN8PCJDox6gb":{"_id":"PxGPYKN8PCJDox6gb","test":"sdfassdfasdfasfd"},"Do8xG2TxP7fPqQG4a":{"_id":"Do8xG2TxP7fPqQG4a","test":"sdfassdfasdfasfd"},"uMicLdcKmFKkvYgr5":{"_id":"uMicLdcKmFKkvYgr5","test":"sdfassdfasdfasfd"},"BWvrtnYk8FmJQCnFr":{"_id":"BWvrtnYk8FmJQCnFr","test":"sdfassdfasdfasfd"},"XrSq3ZR5GYgXrfide":{"_id":"XrSq3ZR5GYgXrfide","test":"sdfassdfasdfasfd"},"dayYw3Y67R72xAXc5":{"_id":"dayYw3Y67R72xAXc5","test":"sdfassdfasdfasfd"},"rPTMEQKofvMmkJ3xG":{"_id":"rPTMEQKofvMmkJ3xG","test":"sdfassdfasdfasfd", "test2":{"_id":"sfsdfsdfsdfds", "value":"hmmm"}, "test":[0,1,2,3,4,5,6,7, "bingo", {"bar":"foo"}]}}';

  testObject('org json object', EJSON.parse(myJSON));

  testObject('object 2', {
      "5qSjMxCjkNF2SFBy6": {
      _id: "5qSjMxCjkNF2SFBy6",
      foo: "test"
    },
      "rbieX9SbdGgfSWCd7": {
      _id: "rbieX9SbdGgfSWCd7",
      foo: "test",
      bar: "okay"
    }
  });



  testObject('object 3', {
      "5qSjMxCjkNF2SFBy6": {
      _id: "5qSjMxCjkNF2SFBy6",
      foo: "test"
    },
      "rbieX9SbdGgfSWCd7": {
      _id: "rbieX9SbdGgfSWCd7",
      foo: "test",
      bar: "okay",
      test: false,
      test2: true,
      ok: null
    }
  });



  var iterations = 10;

  // speed test
  speedTest('JSON.parse time: ', iterations, function() {
    JSON.parse(myJSON);
  });

  speedTest('EJSON.parse time: ', iterations, function() {
    EJSON.parse(myJSON);
  });

  speedTest('MiniMax.maxify time: ', iterations, function() {
    MiniMax.maxify(minResult);
  });

  speedTest('JSON.stringify time: ', iterations, function() {
    JSON.stringify(myJSON);
  });

  speedTest('EJSON.stringify time: ', iterations, function() {
    EJSON.stringify(myJSON);
  });

  speedTest('MiniMax.minify time: ', iterations, function() {
    MiniMax.minify(maxResult);
  });


});


//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equalactual, expected, message, not
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
//test.equal(a, b, msg)
