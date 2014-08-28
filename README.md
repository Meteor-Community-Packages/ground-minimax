Minimax [![Build Status](https://travis-ci.org/GroundMeteor/ejson-minimax.png?branch=master)](https://travis-ci.org/GroundMeteor/ejson-minimax)
===============

This is a small package that adds:
* `MiniMax.minify` Compress object to array structure
* `MiniMax.maxify` Decompress to object
* `MiniMax.stringify` ~ Like a compressed version of `EJSON.stringify`
* `MiniMax.parse` ~ Like the decomressing version of `EJSON.parse`

##Usage
In short:
Schema and schema less documents are minified to an array format:
  1. Array of keywords
  2. Array of data schemas
  3. Array of data

##How does it work? (example)

Our data object:
```js
var data = {
  "5qSjMxCjkNF2SFBy6": {
  _id: "5qSjMxCjkNF2SFBy6",
  foo: "test"
},
  "rbieX9SbdGgfSWCd7": {
  _id: "rbieX9SbdGgfSWCd7",
  foo: "test",
  bar: "okay"
}
};
```

In EJSON.stringify = 136 chars
```js
{"5qSjMxCjkNF2SFBy6":{"_id":"5qSjMxCjkNF2SFBy6","foo":"test"},
"rbieX9SbdGgfSWCd7":{"_id":"rbieX9SbdGgfSWCd7","foo":"test",
"bar":"okay"}} 
```

In EJSON.minify = 117 chars saved 14% space
```js
[["5qSjMxCjkNF2SFBy6","_id","foo","rbieX9SbdGgfSWCd7","bar"], // Keywords
[0,[-1,2,4],[0,3]], // Schema
[2,[1,0,"test"],[1,3,"test","okay"]]] // Data
```

The data array it self in this example is only about 36 chars ~ 27% of the original EJSON.stringify - if both server and client have keywords and the schema only the data would have to be sent.

```js
[2,[1,0,"test"],[1,3,"test","okay"]] 
```

```js
  Keywords:
  [["5qSjMxCjkNF2SFBy6","_id","foo","rbieX9SbdGgfSWCd7","bar"],
  Schemas:
  [0,[-1,2,4],[0,3]],
  data:
  [2,[1,0,"test"],[1,3,"test","okay"]]] 
```

The keyword array contains key names
```js
  [1,0,"test"]
  The "1" referes to the object schema [-1,2,4] - if pointing to
  schema 0 then the data is an array.
  {0, "test"}
  In the schema the "-1", the minus says that the value is a
  keyword reference and the 1 points to the keyword "_id"
  In the schema the "2" points to keyword "foo" and use the value
  in the data.
  The "4" in the schema isnt used - this is an extension of the
  schema to match the "bar" in the other object.
  [-1,2,4] -> [_id, foo, bar_]
  [-1,+2,+4] -> [0 = "5qSjMxCjkNF2SFBy6", "test"]
  -> {_id: "5qSjMxCjkNF2SFBy6", foo: "test"_}

```

##Future
* Faster code
* Better compression
