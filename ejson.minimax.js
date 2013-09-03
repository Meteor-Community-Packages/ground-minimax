/*
  Minify and Maxify by RaiX aka Morten N.O. Nørgaard Henriksen (mh@gi-software.com)

  EJSON.minify( Object )

  EJSON.maxify( JSON string )

  


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


  EJSON.minify = function(maxObj) {
    var keywords = {'false': 0, 'true': 1, 'null': 2};
    var keywordsList = [false, true, null];
    var headers = [0];

    var getIdKeywork = function(key) {
      if (typeof keywords[key] === 'undefined') {
        keywords[key] = keywordsList.push(key) - 1;
      }
      return keywords[key];
    };

    // we give a value - if found in keywords then an id is returned else null
    var getIdKeywordValue = function(value) {
      var key = String(value);
      if (typeof keywords[key] !== 'undefined') {
        return keywords[key];
      }
      return null;
    };

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
        var minKey = (createHeader) ? getIdKeywork(key) : 0;
        if (value !== null && typeof value === 'object') {
          // Array or Object
          if (createHeader) {
            header.push(minKey);
          }
          target.push(minifyHelper(value));
        } else {
          // Check if value is found in keywords
          var valueId = getIdKeywordValue(value);

          if (valueId === null) {
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
      return EJSON.stringify(maxObj);
    }

    var data = minifyHelper(EJSON.toJSONValue(maxObj));

    // Remove the heading false, true, null - these are added at maximize
    keywordsList.shift();
    keywordsList.shift();
    keywordsList.shift();

    return JSON.stringify([ keywordsList, headers, data ]);
  };
  

  // Takes an minify JSON object and maxify to object
  EJSON.maxify = function(minObjJSON) {
    // Parse the string into array
    var minObj = JSON.parse(String(minObjJSON));
    // We expect an array of 3
    if (minObj === null || minObj.length !== 3) {
      // Return normal EJSON.parse
      return EJSON.fromJSONValue(minObj);
    }
    // Init globals
    var keywordsList = minObj[0];
    var headers = minObj[1];
    var data = minObj[2];

    // Add [false, true, null] to the beginning
    keywordsList.unshift(false, true, null);

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
          var key = keywordsList[Math.abs(keyId)];
          // Is value an array then dig deeper
          if (_.isArray(minObj[i])) {
            result[key] = maxifyHelper(minObj[i]);
          } else {
            var value = minObj[i]; // Value or valueId
            // if keyId is negative then lookup the value in keywords
            if (keyId < 0) {
              value = keywordsList[value];
            }
            result[key] = value;
          }
        }
      }
      return result;
    };

    return EJSON.fromJSONValue(maxifyHelper(data));
  };