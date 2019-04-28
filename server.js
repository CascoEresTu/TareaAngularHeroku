var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var MOVIES_COLLECTION = "movies";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
    if (err) {
        console.log('jolis')
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// MOVIES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}

/*  "/api/movies"
 *    GET: finds all movies
 *    POST: creates a new movie
 */

app.get("/api/movies", function (req, res) {
    db.collection(MOVIES_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get movies.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/movies", function (req, res) {
    var newMovie = req.body;
    newMovie.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(MOVIES_COLLECTION).insertOne(newMovie, function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new movie.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/movies/:id"
 *    GET: find movie by id
 *    PUT: update movie by id
 *    DELETE: deletes movie by id
 */

app.get("/api/movies/:id", function (req, res) {
    db.collection(MOVIES_COLLECTION).findOne({
        _id: new ObjectID(req.params.id)
    }, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get movie");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/movies/:id", function (req, res) { 
     var updateDoc = req.body;
     delete updateDoc._id;

     db.collection(MOVIES_COLLECTION).updateOne({
       _id: new ObjectID(req.params.id)
     }, updateDoc, function (err, doc) {
       if (err) {
         handleError(res, err.message, "Failed to update movie");
       } else {
         updateDoc._id = req.params.id;
         res.status(200).json(updateDoc);
       }
     });
});

app.delete("/api/movies/:id", function (req, res) { 
    db.collection(MOVIES_COLLECTION).deleteOne({
      _id: new ObjectID(req.params.id)
    }, function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete movie");
      } else {
        res.status(200).json(req.params.id);
      }
    });
});
