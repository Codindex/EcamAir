let express = require('express');

// Application (server)
let app = express();

app.use(express.urlencoded({extended: true}));

// session
let session = require("express-session");
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true
}));

// Router
let routes = require('./router');

app.use('/', routes);

app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});