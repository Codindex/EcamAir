// Database
let connection = require('../db');

// Models
let Booking = require('../models/booking');

let Traveler = require('../models/traveler');


// First screen get
exports.booking = function(request, response) {
    // Reinitialisation
    request.session.travel = undefined;
    request.session.travelId = undefined;
    request.session.travelers = [];

    response.render('home.ejs');
}
// Post
exports.firstStep = function(req, res) {
    let assurance = 0;
    // console.log(req.body.assurance.value);
    if (req.body.assurance) {
        assurance = 1;
    }
    req.session.travel = new Booking(req.body.destination, req.body.nbseat, assurance);
    connection.query("SELECT * FROM booking;", function(err, results) {
        if (err) res.status(400).send(err);
        else {
            console.log(results);
            // if (results.length == 0) req.session.travelId = 1;
            // else req.session.travelId = results[-1].IdVoyage + 1;
        }
    });
    res.redirect('/persons');
}

// Travelers encoding, method get
exports.travelersEncoding = function(req, res) {
    res.render('person.ejs', {nbseat: req.session.travel.Places});
}
// Post
exports.secondStep = function(req, res) {
    for (let i = 0; i < req.session.travel.Places; i++) {
        req.session.travelers.push(
            new Traveler(
                req.body["name"+i.toString()],
                req.body["age"+i.toString()],
                // req.session.travelId
            )
        );
    }
    console.log(req.session.travelers);
    res.redirect('/validation');
}

// Validation screen, method get
exports.validationScreen = function(req, res) {
    res.render('validation.ejs', {destination: req.session.travel.Destination, travelers: req.session.travelers});
}

// Approve screen
exports.greetings = function(req, res) {
    connection.query("INSERT INTO booking set ?", req.session.travel, function(err, results) {
        if (err) res.status(400).send(err);
        else console.log("Booking sent !");
    });

    for (let traveler of req.session.travelers) {
        connection.query("INSERT INTO travelers set ?", traveler, function(err, results) {
            if (err) res.status(400).send(err);
            else console.log("- traveler sent !");
        });
    }

    res.render('confirmation.ejs');
}