var express = require('express');
var connect = require('connect');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Playlist = require('./models/Playlist');

var credentials = require('./modules/credentials.js');
var app = express();

// app.use(connect.compress());
// handlebars
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

app.use(function (req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

app.use(express.static(__dirname + '/public'));

require('./modules/routes')(app);

// database:
var opts = {
    server: {
        socketOptions: { keepAlive: 1}
    }
};
// mongoose.connect(credentials.mongo.development.connectionString, opts);

var Vacation = require('./models/mongo.js');
Vacation.find(function (err, tests) {
    if (err) throw err;
    if (tests.length) return;
    
    new Vacation({
        type: "SoundCloud",
        url: "coolio"
    }).save();
    new Vacation({
        type: "YouTube",
        url: "bamse"
    }).save();
    new Vacation({
        type: "SoundCloud",
        url: "lalala"
    }).save();
})


app.listen(app.get('port'), function() {
    console.log('express started on c9 localhost-ish:' +
                app.get('port') + '; press ctrl-c to terminate');
});