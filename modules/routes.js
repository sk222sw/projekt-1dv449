var Vacation = require('./../models/mongo.js');

module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
			res.render('home');
	});

	app.get('/track', function(req, res) {
	    res.render('/', {csrf: 'csrf token goes here'});
	});

	app.post('/', function (req, res) {
		var url = req.body.fieldUrl || '';
		
			if (req.xhr) return res.json({success: true});
			req.session.flash = {
				type: 'success',
				intro: 'Thank you!',
				message: 'Awesome url, dude!'
			};
			return res.redirect(303, "/");
		// }
		
	});

	app.get('/vacations', function(req, res){
		Vacation.find({ 'type': 'SoundCloud'}, function (err, vacations) {
			console.log(vacations)
			var context = {
				vacations: vacations.map(function(vacation){
					return {
						url: vacation.url
					}
				})
			};
			res.render('vacations', context);
		});
	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};