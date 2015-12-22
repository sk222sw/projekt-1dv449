module.exports = function(app) {
	app.get('/:var(home|index)?', function(req, res) {
			res.render('home');
	});

	app.use(function(req, res) {
		res.type('text/plain');
		res.status(404);
		res.send('404 - not found');
	});
};