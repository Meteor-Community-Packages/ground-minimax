EJSON - Minimax
===============

This is a small package that adds:
* `EJSON.minify` ~ Like a compressed version of `EJSON.stringify`
* `EJSON.maxify` ~ Like the decomressing version of `EJSON.parse`

#Usage
In short:
Schema and schema less documents are minified to an array format:
  1. Array of keywords
  2. Array of data schemas
  3. Array of data

#How does it work? (example)

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
[["5qSjMxCjkNF2SFBy6","_id","foo","rbieX9SbdGgfSWCd7","bar"],
[0,[-1,2,4],[0,3]],[2,[1,0,"test"],[1,3,"test","okay"]]] 
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
  The "1" referes to the schema [-1,2,4] - if pointing to
  schema 0 then the data is an array.
  In the schema the "-1", the minus says that the value is a
  keyword reference and the 1 points to the keyword "_id"
  In the schema the "2" points to keyword "foo" and use the value
  in the data.
  The "4" in the schema isnt used - this is an extension of the
  schema to match the "bar" in the other object.

  so we get:
  { _id:"5qSjMxCjkNF2SFBy6", foo :"test" }

```