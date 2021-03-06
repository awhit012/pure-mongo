const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/foo';

// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  // "assert" there is no error
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, () => {
  	findDocuments(db, () => {
      db.close();
    });
  });	
});

const insertDocuments = (db, callback) => {
  // Get the documents collection 
  let collection = db.collection('documents');
  // Insert some documents 
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], (err, result) => {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

var findDocuments = (db, callback) => {
  // Get the documents collection 
  let collection = db.collection('documents');
  // Find some documents 
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}