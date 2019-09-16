'use strict';

let fs = require('fs'),
    mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

const MongoClient = require('mongodb').MongoClient;
const uri = config.db.uri;
let collection;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    collection = client.db("Bootcamp2").collection("listings");

    fs.readFile('listings.json', 'utf8', function(err, data) {

        //Get JSON data.
        let listingJSON = JSON.parse(data);

        //Add each JSON entry to DB.
        listingJSON.entries.forEach(function(listing) {
            let listingDoc = new Listing(listing);
            collection.insertOne(listingDoc);

        });

    });

});