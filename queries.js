//Required Libraries
mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

//Connect to DB
let collection;
const MongoClient = require('mongodb').MongoClient;
const uri = config.db.uri;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    collection = client.db("Bootcamp2").collection("listings");

    findLibraryWest();
    removeCable();
    updatePhelpsLab();
    retrieveAllListings();

});

let findLibraryWest = function() {

    //Finds the Library West doc and logs to console.
    collection.find({ code : "LBW" }).next()
        .then(doc => console.log("Library West:\n", doc));

};

let removeCable = function() {

    // Finds the cable listing and logs to console.
    collection.find({ code : "CABL" }).next()
        .then(doc => console.log("Cable Listing:\n", doc));

    //Removes the cable listing doc from the DB.
    collection.deleteMany({ code : "CABL" });


};

let updatePhelpsLab = function() {

    //Updates the address field of the Phelps Lab doc in the DB.
    collection.updateMany(
        { code : "PHL" },
        {
            $set: {
                address: "1953 Museum Rd, Gainesville, FL 32603"
            }
        }
    );

    //Finds the updated Phelps Lab doc and logs to console.
    let phelpsLab = collection.findOne({ code : "PHL" });
    console.log(phelpsLab);

};

let retrieveAllListings = function () {

    //Finds all listings in the DB and logs to console.
    let allListings = collection.find();
    console.log(allListings);

};