/*
  Minify and Maxify by RaiX aka Morten N.O. Nørgaard Henriksen (mh@gi-software.com)

  EJSON.minify( Object )

  EJSON.maxify( array )

  TODO:
  Make minify and maxify object operators only - leave the stringify and parsing
  to the user if they need it - This way the operation is isolated and could be
  used in more cases


  // For faster lookup
  var keywords = {
    '_id': 0,
    'test': 1,
    'comment': 2,
    'list': 3,
    'note': 4
  };

  var keywordsList = [ '_id', 'test', 'comment', 'list', 'note' ];

  var headers = [0, [0, 1, 2], [0, 3, -5] ];

  var data = []; */

  // if(!Array.isArray) {
  //   Array.isArray = function (vArg) {
  //     return Object.prototype.toString.call(vArg) === '[object Array]';
  //   };
  // }

  // Create the export scope
  if (typeof MiniMax === 'undefined')
    MiniMax = {};
  // Create a new dictionary
  MiniMax.Dictionary = new Dictionary();

  // Set the initial dicationary
  MiniMax.Dictionary.set([false, true, null]);


  MiniMax.minify = function(maxObj) {

    var headers = [0];

    // Start dictionary
    var dict = new Dictionary(MiniMax.Dictionary);

    var getHeader = function(newHeader) {
      var headerId = null;
      for (var i = 1; i < headers.length; i++) {
        var orgHeader = headers[i];
        // We only need to iterate over the intersection to get a match
        var minLength = Math.min(orgHeader.length, newHeader.length);
        var isMatch = true;
        for (var a = 0; a < minLength; a++) {
          // We break if not a match
          if (orgHeader[a] !== newHeader[a]) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          // We check to see if
          // We are equal or in another header
          // eg. headers = [1, 2, 3] newHeader=[1, 2, 3] return id
          // eg. headers = [1, 2, 3, 4] newHeader=[1, 2, 3] return id
          headerId = i;
          // We could maybe contain another header - so we extend the org. and use
          // that eg. headers = [1, 2, 3] newHeader=[1, 2, 3, 4] then
          // set headers=newHeader and return id
          if (newHeader.length > minLength) {
            headers[i] = newHeader;
          }
        }
        // Stop when we found a match
        if (headerId !== null) {
          break;
        }
      }
      // Or none of the above we add a new header
      if (headerId === null) {
        headerId = headers.push(newHeader) - 1;
      }
      return headerId;
    };

    var minifyHelper = function(maxObj) {
      var createHeader = !_.isArray(maxObj);
      var target = [];
      var header = [];

      _.each(maxObj, function(value, key) {

        var minKey = (createHeader) ? dict.add(key) : 0;

        if (value !== null && typeof value === 'object') {
          // Array or Object
          if (createHeader) {
            header.push(minKey);
          }
          target.push(minifyHelper(value));
        } else {
          // Check if value is found in keywords
          var valueId = dict.index(value);

          if (valueId === undefined) {
            // Not found, we add normal values
            header.push(minKey);
            target.push(value);
          } else {
            // Found, make minKey negative and set value to valueId
            header.push(-minKey);
            target.push(valueId);
          }
        }
      });

      if (createHeader) {
        var headerId = getHeader(header);
        target.unshift(headerId);
      } else {
        target.unshift(0); // 0 marks an array with no headers
      }


      return target;
    };

    // If not an object then not much to work on
    if (typeof maxObj !== 'object') {
      return maxObj;
    }

    var data = minifyHelper(maxObj);

    return [ dict.withoutInitial(), headers, data ];
  };


  // Takes an minify object and maxify to object
  MiniMax.maxify = function(minObj) {
    // We expect an array of 3
    if (minObj === null || minObj.length !== 3) {
      // Return object
      return minObj;
    }
    // Init globals
    var dict = new Dictionary(MiniMax.Dictionary);
    dict.addList(minObj[0]);

    var headers = minObj[1];
    var data = minObj[2];

    var maxifyHelper = function(minObj) {
      // read header reference and fetch the header
      var headerId = minObj.shift();
      var header = (headerId) ? headers[headerId] : null;

      // If header === 0 then we are creating an array otherwise an object
      var result = (header === null) ? [] : {};
      // We launch interation over the minObj
      if (header === null) {
        // Create an array
        for (var i = 0; i < minObj.length; i++) {
          if (_.isArray(minObj[i])) {
            result.push(maxifyHelper(minObj[i]));
          } else {
            result.push(minObj[i]);
          }
        }
      } else {
        // Create object
        for (var i = 0; i < minObj.length; i++) {
          // Lookup keyword id can be negative for value lookup
          var keyId = header[i];
          // Lookup keyword
          var key = dict.value(Math.abs(keyId));
          // Is value an array then dig deeper
          if (_.isArray(minObj[i])) {
            result[key] = maxifyHelper(minObj[i]);
          } else {
            var value = minObj[i]; // Value or valueId
            // if keyId is negative then lookup the value in keywords
            if (keyId < 0) {
              value = dict.value(value);
            }
            result[key] = value;
          }
        }
      }
      return result;
    };

    return maxifyHelper(data);
  };

  MiniMax.stringify = function(obj) {
    return EJSON.stringify(this.minify(obj));
  };

  MiniMax.parse = function(str) {
    return this.maxify(EJSON.parse(str));
  };
