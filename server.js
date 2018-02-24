// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');


const port = 8000;

const app            = express();

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: false
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());



MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
 

   // Make sure you add the database name and not the collection name
  let db = database.db("note-api");
  require('./app/routes')(app, db);
 

  
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  
  });

